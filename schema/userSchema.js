import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_edited: {
    type: Date,
    default: null,
  },
  articles_written: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  liked_articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
  }],
});

export default mongoose.model("Users", userSchema);