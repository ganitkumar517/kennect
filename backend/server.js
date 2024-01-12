// server.js
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const NameModel = require("./models/Name");
const cors = require("cors");
const PostModel = require("./models/post");

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
    const { name, userName, userMessage } = req.body;

    const user = await NameModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new PostModel({
      userName,
      userMessage,
      comments: [],
    });
    console.log(req,"this is")
    await newPost.save();

    const token = jwt.sign({ userName }, jwtSecret, { expiresIn: "1h" });
    res.status(201).json({ message: "Post created successfully", token });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const postsWithComments = await PostModel.find();

    res.status(200).json(postsWithComments);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
