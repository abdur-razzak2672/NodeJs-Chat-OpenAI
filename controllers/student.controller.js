const studentService = require("../services/student.service");
const validatorMiddleware = require("../middlewares");

exports.createStudent = [
    validatorMiddleware.validateCreateStudent,
    async (req, res) => {
      try {
        const savedStudent = await studentService.createStudent(req.body);
        res.json(savedStudent);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  ];
  
  exports.getAllStudents = async (req, res) => {
    try {
      const students = await studentService.getAllStudents();
      res.json(students);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  exports.getStudentById = async (req, res) => {
    try {
      const student = await studentService.getStudentById(req.params.id);
  
      if (student) {
        res.json(student);
      } else {
        res.status(404).send("Student not found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  exports.updateStudentById = [
    validatorMiddleware.validateUpdateStudent,
    async (req, res) => {
      try {
        const updatedStudent = await studentService.updateStudentById(req.params.id, req.body);
  
        if (updatedStudent) {
          res.json(updatedStudent);
        } else {
          res.status(404).send("Student not found");
        }
      } catch (err) {
        res.status(500).send(err);
      }
    }
  ];
  
  exports.deleteStudentById = async (req, res) => {
    try {
      const deletedStudent = await studentService.deleteStudentById(req.params.id);
  
      if (deletedStudent.deletedCount === 1) {
        res.sendStatus(200);
      } else {
        res.status(404).send("Student not found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };