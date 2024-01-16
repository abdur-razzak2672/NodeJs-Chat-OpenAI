const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://abdurrazzak:abdurrazzak@cluster0.nbpwf8k.mongodb.net/Student';

module.exports = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.log(err);
  }
};