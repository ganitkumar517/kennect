// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = "mongodb+srv://naman-123:Ynag123@cluster0.ewv2nsm.mongodb.net";
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
