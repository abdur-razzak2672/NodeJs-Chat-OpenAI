// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  studentId: String,
  department: String,
  semester: String,
});

module.exports = mongoose.model('Student', studentSchema);
