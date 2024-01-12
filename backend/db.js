const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = "mongodb+srv://jeetmehra517:Ganit%40517@cluster0.kw9ft7w.mongodb.net/<database>?retryWrites=true&w=majority";
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;