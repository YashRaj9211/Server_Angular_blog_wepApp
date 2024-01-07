import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  comment_content: {
    type: String,
    required: true,
  },
  comment_likes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Comment', commentSchema);
