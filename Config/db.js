const mysql = require("mysql");
const dotenv = require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,
});

db.connect((err) => {
  if (err) {
    console.log({ ErrorDB: err });
  } else {
    // console.log("Connected to Database");
  }
});

module.exports = { db };
