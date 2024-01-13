const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: String,
  userMessage: String,
  comments: [
    {
      name: String,
      comment: String,
    },
  ],
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
