const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');
const routes = require('./routes/index');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(cors());
app.use(express.json());
app.use('/api', routes(db));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
