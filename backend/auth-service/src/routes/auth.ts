import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password, location } = req.body;
  console.log({username, email, password, location})
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, location });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email, password })
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, location: user.location } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/verify', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  console.log("token auth: ", token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return res.json({ userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/profile/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;