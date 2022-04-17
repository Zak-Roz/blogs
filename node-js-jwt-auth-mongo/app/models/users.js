const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,
  login: { type: String, required: true, unique: true },
  password: String,
  code: String,
  status_u: { type: Number, ref: 'StatusUser' },
  createdAt: Date,
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);