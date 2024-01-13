// server.js
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const NameModel = require("./models/Name");
const cors = require("cors");
const PostModel = require("./models/post");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
connectDB();

const jwtSecret = "YOUR_JWT_SECRET";

app.post("/api/names", async (req, res) => {
  try {
    const { name } = req.body;
    const newName = new NameModel({ name });

    await newName.save();

    const token = jwt.sign({ name }, jwtSecret, { expiresIn: "1h" });
    res.status(201).json({ message: "Name stored successfully", token });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/posts", async (req, res) => {
  try {
    const { name, userMessage } = req.body;

    const user = await NameModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new PostModel({
      name,
      userMessage,
      comments: [],
    });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/posts", async (req, res) => {
    try {
      const { search } = req.query;
  
      let query = {};
  
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { 'comments.comment': { $regex: search, $options: 'i' } },
        ];
      }
  
      const postsWithComments = await PostModel.find(query);
  
      const formattedPosts = postsWithComments.map((post) => ({
        id: post._id,
        name: post.name,
        userMessage: post.userMessage,
        comments: post.comments,
      }));
  
      res.status(200).json(formattedPosts);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/posts/:postId/comments", async (req, res) => {
  try {
    const { name, comment } = req.body;
    const { postId } = req.params;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      name,
      comment,
    };

    post.comments.push(newComment);
    await post.save();

    const postIdInResponse = post._id;

    res
      .status(201)
      .json({
        message: "Comment added successfully",
        postId: postIdInResponse,
      });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
