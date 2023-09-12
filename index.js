// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://abdurrazzak:abdurrazzak@cluster0.nbpwf8k.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database!");


}).catch((err) => {
    console.log(err);
    console.log("Cannot connect to the database!");

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new student
app.post('/students', (req, res) => {
  const newStudent = new Student(req.body);
  newStudent.save((err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(student);
    }
  });
});

// Read all students
app.get('/students', async (req, res) => {
    try {
      const students = await Student.find({});
      res.json(students);
    } catch (err) {
      res.status(500).send(err);
    }
});
 






// Update a student by ID
app.put('/students/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(student);
    }
  });
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
