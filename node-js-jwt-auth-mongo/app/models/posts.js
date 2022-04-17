const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  username: String,
  images: [{ type: String, }],
  createdAt: Date,
}, { collection: 'posts' });

module.exports = mongoose.model('Post', PostSchema);