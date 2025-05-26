import express, { Request, Response } from 'express';
import Reaction from '../models/Reaction';
import axios from 'axios';

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const router = express.Router();

const verifyToken = async (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const { data } = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    req.userId = (data as { userId: string }).userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

router.post('/', verifyToken, async (req: Request, res: Response) => {
  const { postId, type, content } = req.body;
  try {
    const reaction = new Reaction({ postId, userId: req.userId, type, content });
    await reaction.save();
    res.status(201).json(reaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add reaction' });
  }
});

router.get('/post/:postId', async (req: Request, res: Response) => {
  try {
    const reactions = await Reaction.find({ postId: req.params.postId });
    res.json(reactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;