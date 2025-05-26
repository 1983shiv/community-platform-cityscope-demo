import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import reactionRoutes from './routes/reactions';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/reactions', reactionRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/community-platform';

mongoose.connect(MONGO_URI!).then(() => {
  app.listen(process.env.PORT, () => console.log(`Reaction Service running on port ${process.env.PORT}`));
});