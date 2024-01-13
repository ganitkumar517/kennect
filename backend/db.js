// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = "mongodb+srv://jeetmehra517:Ganit%40517@cluster0.kw9ft7w.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoURL, {
      useUnifiedTopology: true,
    )

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
