const request = require("supertest");
const { app } = require("../index.js");
const { db } = require("../Config/db.js");

////////testing users /////////////////////////////

//get list of users data from users databse
describe("Should get all users", () => {
  test("test statuscode of this request", async () => {
    const response = await request(app)
      .get("/api/customers/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
  });
});

//testing the response body received from database users=database

describe("should return data from database", () => {
  test("testing data getting from database ", async () => {
    const response = await request(app)
      .get("/api/customers/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(response.body).toHaveProperty("usersData");
  });
});

//test adding the user to database users=database

describe("should test adding the users to database", () => {
  test("testing the statuscode of post request", async () => {
    const addUser = {
      first_name: "krishna",
      last_name: "radhe",
      username: "krishradhe",
      email: "krish@gmail.com",
      password: "qwerty",
      user_type: "2",
      status: "1",
    };
    const response = await request(app)
      .post("/api/customers/add-user")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addUser);
    expect(response.statusCode).toBe(200);
  });
});

//testing data stored in database or not users=database
describe("should test adding the users to database", () => {
  test("testing data is stored in database or not", async () => {
    const addUser = {
      first_name: "namdev",
      last_name: "kadam",
      username: "nama",
      email: "namdev@gmail.com",
      password: "qwerty",
      user_type: "2",
      status: "1",
    };
    const response = await request(app)
      .post("/api/customers/add-user")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addUser);
    expect(response.statusCode).toBe(200);

    let getQuery = `SELECT * FROM users WHERE first_name=?`;
    let data = await new Promise((resolve, reject) => {
      db.query(getQuery, [addUser.first_name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    expect(data.first_name).toEqual(addUser.first_name);
  });
});

//Editing the users data from database users=database

describe("should update user from database", () => {
  test("testing the status code of put request", async () => {
    const editUser = {
      first_name: "Shree_Krishna",
      last_name: "radheshree",
      username: "krishradhe",
      email: "krish@gmail.com",
      password: "qwerty",
      user_type: "2",
      status: "1",
    };
    let user_id = 12;
    const response = await request(app)
      .put(`/api/customers/edit-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editUser);
    expect(response.statusCode).toBe(200);
  });
});

//testing data updated in database or not users=database
describe("should updating the user from database", () => {
  test("testing data is updated in database or not when put request is made", async () => {
    const editUser = {
      first_name: "Shree_Krishna",
      last_name: "radheshree",
      username: "krishradhe",
      email: "krish@gmail.com",
      password: "qwerty",
      user_type: "2",
      status: "1",
    };
    let user_id = 12;
    const response = await request(app)
      .put(`/api/customers/edit-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editUser);
    expect(response.statusCode).toBe(200);

    let getQuery = `SELECT * FROM users WHERE first_name=?`;
    let data = await new Promise((resolve, reject) => {
      db.query(getQuery, [editUser.first_name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.first_name).toEqual(editUser.first_name);
  });
});

//get user data by user_id from user database

describe("should return data of particular user", () => {
  test("testing response of get request made to get data by user_id", async () => {
    let user_id = 12;
    const response = await request(app)
      .get(`/api/customers/get-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });

  describe("should test particular user from database", () => {
    test("testing the user data got from database", async () => {
      let user_id = 12;
      const response = await request(app)
        .get(`/api/customers/get-user/${user_id}`)
        .set(
          "authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
        );
      expect(response.body).toHaveProperty("IdData");
    });
  });
});

//////////////////Customer_master testing eg:organization name,address,etc/////////////////////

//getting data of particular customer from customer_master database
describe("should test get request", () => {
  //testing statusCode
  test("should test statuscode", async () => {
    let user_id = 2;
    const response = await request(app)
      .get(`/api/customers/getall/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
  });
  //testing body received is object or not
  test("should test body is object or not", async () => {
    let user_id = 2;
    const response = await request(app)
      .get(`/api/customers/getall/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(typeof response.body).toBe("object");
  });
  //testing response body is desired format or not
  test("should test received body from response ", async () => {
    let user_id = 2;
    const response = await request(app)
      .get(`/api/customers/getall/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(response.body).toHaveProperty("getData");
  });
});

//getting data of particular customer from customer_master database

describe("should test status of request made to get data of particular customer_master", () => {
  test("testing the statuscode of get request made", async () => {
    const user_id = 12;
    const response = await request(app)
      .get(`/api/customers/get-customer-details/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should test status of request made to get data of particular customer_master", () => {
  test("testing data stored in customer_master database", async () => {
    const user_id = 2;
    let custoData = {
      company_name: "bellrise",
    };
    const response = await request(app)
      .get(`/api/customers/get-customer-details/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    let getQuery = "SELECT * FROM customer_master WHERE user_id=?";
    let data = await new Promise((resolve, reject) => {
      db.query(getQuery, [user_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    expect(data.company_name).toEqual(custoData.company_name);
  });
});

//adding the data to customer_master database

describe("should add data to customer_master database", () => {
  let addData = {
    company_name: "tesla",
    address: "wakad",
    state: "Maharashtra",
    city: "pune",
    pincode: "123123",
    phone: "4536271527",
    status: "1",
  };
  test("testing statuscode of post request made", async () => {
    let user_id = 12;
    const response = await request(app)
      .post(`/api/customers/add-customer/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addData);
    expect(response.statusCode).toBe(200);
  });
});

describe("should add data to customer_master database", () => {
  let addData = {
    company_name: "tesla",
    address: "wakad",
    state: "Maharashtra",
    city: "pune",
    pincode: "123123",
    phone: "4536271527",
    status: "1",
  };
  test("testing statuscode of post request made", async () => {
    let user_id = 12;
    const response = await request(app)
      .post(`/api/customers/add-customer/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addData);
    expect(response.statusCode).toBe(200);
    const getQuery = "SELECT * FROM customer_master WHERE company_name=?";

    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [addData.company_name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.company_name).toEqual(addData.company_name);
    expect(typeof response.body).toBe("object");
  });
});

//updating the data stored in customer_master database

describe("should return statuscode of put request", () => {
  test("testing the statusCode of put request made to customer_master database", async () => {
    const editCusto = {
      company_name: "bellrise",
      address: "fc_road",
      state: "Maharashtra",
      city: "pune",
      pincode: "235432",
      phone: "7565776543",
      status: "1",
    };
    const customer_id = 12;
    const response = await request(app)
      .put(`/api/customers/edit-customer/${customer_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editCusto);

    expect(response.statusCode).toBe(200);
  });
});

describe("should return data_type of put request", () => {
  test("testing the data_type of put request made to customer_master database", async () => {
    const editCusto = {
      company_name: "bellrise",
      address: "fc_road",
      state: "Maharashtra",
      city: "pune",
      pincode: "235432",
      phone: "7565776543",
      status: "1",
    };
    const customer_id = 12;
    const response = await request(app)
      .put(`/api/customers/edit-customer/${customer_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editCusto);

    expect(typeof response.body).toBe("object");
  });
});

describe("should return data from customer_master database", () => {
  test("testing data updated by put request", async () => {
    const editCusto = {
      company_name: "bellrise",
      address: "fc_road",
      state: "Maharashtra",
      city: "pune",
      pincode: "235432",
      phone: "7565776543",
      status: "1",
    };

    const getQuery = "SELECT * FROM customer_master WHERE company_name=?";

    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [editCusto.company_name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.company_name).toEqual(editCusto.company_name);
  });
});

//get request

describe("should return statuscode of response", () => {
  test("testing statuscode of response", async () => {
    const response = await request(app)
      .get(`/api/customers/getall`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response", () => {
  test("testing datatype of response", async () => {
    const response = await request(app)
      .get(`/api/customers/getall`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return key of response object", () => {
  test("testing data from database", async () => {
    const response = await request(app)
      .get(`/api/customers/getall`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("usersData");
  });
});

//post request
describe("should return statuscode of response", () => {
  const adduser = {
    first_name: "rohit",
    last_name: "shekhvat",
    username: "rohitshekhavat",
    email: "rohit@gmail.com",
    password: "qwerty",
    user_type: "2",
    status: "1",
  };
  test("testing statuscode of post request made", async () => {
    const response = await request(app)
      .post(`/api/customers/add-user`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(adduser);
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response", () => {
  const adduser = {
    first_name: "rohit",
    last_name: "shekhvat",
    username: "rohitshekhavat",
    email: "rohit@gmail.com",
    password: "qwerty",
    user_type: "2",
    status: "1",
  };
  test("testing datatype of post request made", async () => {
    const response = await request(app)
      .post(`/api/customers/add-user`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(adduser);
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of response", () => {
  const adduser = {
    first_name: "gopal",
    last_name: "shekhvat",
    username: "gopu",
    email: "gopu@gmail.com",
    password: "qwerty",
    user_type: "2",
    status: "1",
  };
  test("testing data from database", async () => {
    const response = await request(app)
      .post(`/api/customers/add-user`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(adduser);
    expect(response.body).toHaveProperty("SignupData");
  });
});

///put request

describe("should return statuscode of response", () => {
  const edituser = {
    first_name: "mukund",
    last_name: "shewani",
    username: "muks",
    email: "mukund@gmail.com",
    password: "qwerty",
    user_type: "2",
    status: "1",
  };
  test("testing statuscode of post request made", async () => {
    const user_id = 16;
    const response = await request(app)
      .put(`/api/customers/edit-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(edituser);
    expect(response.statusCode).toBe(200);
  });
});
describe("should return datatype of response", () => {
  const edituser = {
    first_name: "mukund",
    last_name: "shewani",
    username: "muks",
    email: "mukund@gmail.com",
    password: "qwerty",
    user_type: "2",
    status: "1",
  };
  test("testing datatype of post request made", async () => {
    const user_id = 16;
    const response = await request(app)
      .put(`/api/customers/edit-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(edituser);
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of response", () => {
  const edituser = {
    first_name: "mukund",
    last_name: "shewani",
    username: "muks",
    email: "mukund@gmail.com",
    password: "qwerty",
    user_type: "2",
    status: "1",
  };
  test("testing data from database", async () => {
    const user_id = 16;
    const response = await request(app)
      .put(`/api/customers/edit-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(edituser);
    expect(response.body).toHaveProperty("editResult");
  });
});

//get request

describe("should return statuscode of response", () => {
  test("testing statuscode of post request made", async () => {
    const user_id = 16;
    const response = await request(app)
      .get(`/api/customers/get-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response", () => {
  test("testing datatype of post request made", async () => {
    const user_id = 16;
    const response = await request(app)
      .get(`/api/customers/get-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of response", () => {
  test("testing data of response", async () => {
    const user_id = 16;
    const response = await request(app)
      .get(`/api/customers/get-user/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("IdData");
  });
});

//get request
describe("should return statuscode of response", () => {
  test("testing statuscode of post request made", async () => {
    const user_id = 16;
    const response = await request(app)
      .get(`/api/customers/get-customer-details/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response", () => {
  test("testing datatype of response", async () => {
    const user_id = 16;
    const response = await request(app)
      .get(`/api/customers/get-customer-details/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of response", () => {
  test("testing data from database", async () => {
    const user_id = 16;
    const response = await request(app)
      .get(`/api/customers/get-customer-details/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("IdData");
  });
});
