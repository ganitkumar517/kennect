// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const NameModel = require('./models/Name');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
