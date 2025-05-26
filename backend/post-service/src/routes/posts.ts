import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { cloudinary } from '../config/cloudinary';
import Post from '../models/Post';
import axios from 'axios';


declare namespace Express {
  interface Request {
    files?: fileUpload.FileArray;
  }
}

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const router = express.Router();

// Add fileUpload middleware to the router
router.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  useTempFiles: true,
  // tempFileDir: '/tmp/',
  tempFileDir: 'C:\\Windows\\Temp\\',
  createParentPath: true,
  debug: true, // Enable debugging
  parseNested: true,
  abortOnLimit: true
}));

// Helper function to upload to cloudinary
const uploadToCloudinary = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'community-posts',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};



// const verifyToken = async (req: Request, res: Response, next: Function) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     console.log('No token provided');
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     console.log('Verifying token with auth service...');
//     const { data } = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/verify`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log('Auth service response:', data);
    
//     const responseData = data as { userId: string };
//     req.userId = responseData.userId;
//     next();
//   } catch (error: any) {
//     console.error('Token verification failed:', error.message);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

const verifyToken = async (req: Request, res: Response, next: Function) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No or invalid authorization header');
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!process.env.AUTH_SERVICE_URL) {
      console.error('AUTH_SERVICE_URL not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    let response;
    console.log('Verifying token with auth service:', process.env.AUTH_SERVICE_URL);
    response = await axios.get<{ userId?: string }>(`${process.env.AUTH_SERVICE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // console.log('Auth service response:', response.data);
    
    if (!response.data?.userId) {
      console.log('No userId in auth response');
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = response.data.userId;
    next();
  } catch (error: any) {
    console.error('Token verification error:', error.response?.data || error.message);
    return res.status(401).json({ 
      error: 'Unauthorized',
      details: error.response?.data || error.message
    });
  }
};

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    
    // Debug logging
    console.log('Full request:', {
      headers: req.headers,
      body: req.body,
      files: req
    });
     const formData = req.body;
    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({
        error: 'Invalid form data format',
        received: formData
      });
    }

    // const { content, postType, location } = req.body;


    // Parse form fields
    const content = req.body.content;
    const postType = req.body.postType;
    const location = req.body.location;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    let imageUrl = null;
    if (req.files && req.files.image) {
      imageUrl = await uploadToCloudinary(req.files.image);
    }

    const post = new Post({
      userId: req.userId,
      content,
      postType: postType || 'general',
      location,
      imageUrl
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(400).json({ error: 'Failed to create post' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  const { location, postType } = req.query;
  const filter: any = {};
  if (location) filter.location = location;
  if (postType) filter.postType = postType;
  try {
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;