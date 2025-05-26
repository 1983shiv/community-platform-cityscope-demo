import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true, maxlength: 280 },
  postType: { type: String, enum: ['recommend', 'help', 'update', 'event'], required: true },
  imageUrl: { type: String },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Post', PostSchema);