import mongoose, { Schema } from 'mongoose';

const ReactionSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ['like', 'dislike', 'reply'], required: true },
  content: { type: String }, // For replies
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Reaction', ReactionSchema);