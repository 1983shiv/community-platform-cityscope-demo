import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.use('/posts', postRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/community-platform';

mongoose.connect(MONGO_URI!).then(() => {
  app.listen(process.env.PORT, () => console.log(`Post Service running on port ${process.env.PORT}`));
});