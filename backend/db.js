const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_URL,"rhisis")

const connectDB = async () => {
  try {
    const mongoURL = process.env.DB_URL;
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
