const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://jkjohnson1996:<password>@cluster1.i5vk9vv.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to Mongo DB.');
  } catch (err) {
    console.log(err);
    // Optionally, you might want to handle the error more robustly, like exiting the process
    process.exit(1);
  }
};

module.exports = connectDB;
