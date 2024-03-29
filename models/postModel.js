import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPremium: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models?.Post || mongoose.model('Post', postSchema);

export default Post;
