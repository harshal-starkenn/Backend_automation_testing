const mysql = require("mysql");
const { app } = require("./index.js");
const dotenv = require("dotenv").config();

//testing the mysql database connection
describe("Database connection", () => {
  test("should connect to the database", (done) => {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      connectionLimit: 10,
    });

    connection.connect((error) => {
      if (error) {
        done.fail(error);
      } else {
        connection.end((endError) => {
          if (endError) {
            done.fail(endError);
          } else {
            done();
          }
        });
      }
    });
  });
});
