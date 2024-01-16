const Student = require('../models/Student');

exports.createStudent = async (studentData) => {
  const newStudent = new Student(studentData);
  return await newStudent.save();
};

exports.getAllStudents = async () => {
  return await Student.find({});
};

exports.getStudentById = async (studentId) => {
  return await Student.findById(studentId);
};

exports.updateStudentById = async (studentId, updatedData) => {
  return await Student.findOneAndUpdate({ _id: studentId }, updatedData, { new: true });
};

exports.deleteStudentById = async (studentId) => {
  return await Student.deleteOne({ _id: studentId });
};
