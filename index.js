// index.js
const express = require('express');
 const bodyParser = require('body-parser');
 const dbConfig = require('./db');
 const studentRoutes = require('./routes/student.routes');
const app = express();
const port = process.env.PORT || 3000;
 
dbConfig();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', studentRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
