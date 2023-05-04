const request = require("supertest");
const { app } = require("../index.js");
const { db } = require("../Config/db.js");

describe("should return statusCode", () => {
  //testing the request status is 200 or not
  test("should return statusCode 200", async () => {
    const response = await request(app)
      .post("/api/login/login-user")
      .send({ email: "john@gmail.com", password: "qwerty" });
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype", () => {
  //testing the response datatype is object or not
  test("should return datatype of response", async () => {
    const response = await request(app)
      .post("/api/login/login-user")
      .send({ email: "john@gmail.com", password: "qwerty" });
    expect(typeof response.body).toBe("object");
  });
});

describe("should return key of response object", () => {
  //testing the response datatype is object or not
  test("should return key of response object", async () => {
    const response = await request(app)
      .post("/api/login/login-user")
      .send({ email: "john@gmail.com", password: "qwerty" });
    expect(response.body).toHaveProperty("Message");
  });
});

describe("should return datatype", () => {
  //testing the response datatype is object or not
  const userData = { email: "john@gmail.com", password: "qwerty" };
  test("should return datatype of response", async () => {
    const getQuery = "SELECT * FROM users WHERE email=?";

    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [userData.email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    expect(data.email).toEqual(userData.email);
  });
});
