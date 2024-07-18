const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');
const routes = require('./routes/index');
const path = require('path'); 

// Chargez le fichier .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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

app.locals.db = db; // Pass the db connection to app locals

app.use(cors());
app.use(express.json());
app.use('/api', routes(db));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
