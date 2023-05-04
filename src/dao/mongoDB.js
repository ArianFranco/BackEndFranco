const mongoose = require('mongoose');

// Connect to the MongoDB database
const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    throw new Error('Error connecting to MongoDB');
  }
};

module.exports = { dbConnection };