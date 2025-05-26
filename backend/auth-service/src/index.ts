import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(cors());
// app.use(express.json());
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      // Cannot use res.status here because res is a Node.js response, not Express
      // Throw an error and let the error middleware handle the response
      (req as any).invalidJson = true;
      throw new Error('Invalid JSON');
    }
  }
}));

app.use('/auth', authRoutes);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if ((req as any).invalidJson) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  console.error(err.stack);
  // });
  res.status(500).json({ error: 'Something broke!' });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/community-platform';

mongoose.connect(MONGO_URI!).then(() => {
  app.listen(process.env.PORT, () => console.log(`Auth Service running on port ${process.env.PORT}`));
});