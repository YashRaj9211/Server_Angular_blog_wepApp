import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_modified: {
    type: Date,
    default: null,
  },
  total_likes: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  blog_content: {
    type: Object,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
});


export default mongoose.model("BlogPost", blogPostSchema);
