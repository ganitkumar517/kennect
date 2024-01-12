const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userName: String,
  userMessage: String,
  comments: [{
    userName: String,
    userMessage: String,
  }],
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
