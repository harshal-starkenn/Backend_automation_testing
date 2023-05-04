const request = require("supertest");
const { app } = require("../index.js");
const { db } = require("../Config/db.js");
const { get } = require("http");

//get request
//hit the api and check statuscode
describe("should return statuscode getall devices DevicesAPI", () => {
  test("testing statuscode of get request", async () => {
    const response = await request(app)
      .get("/api/devices/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

//hit api and check whether returning data or not

describe("should return data", () => {
  test("testing data to have property of get request", async () => {
    const response = await request(app)
      .get("/api/devices/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("AllData");
  });
});

//testing the data received from database is desired or not
describe("check data getting from database", () => {
  let expectedData = {
    device_id: "EC0155A",
  };
  test("testing data received from device_master database ", async () => {
    const getQuery = "SELECT * FROM devices_master WHERE device_id=?";
    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [expectedData.device_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.device_id).toEqual(expectedData.device_id);
  });
});

//post request
//adding the device to database checking statuscode
describe("should return statuscode of post request", () => {
  const addDevice = {
    device_id: "EC43431A",
    device_type: "ECU",
    user_id: "2",
    sim_number: "4567834567",
    status: "1",
  };
  test("testing statuscode of post request", async () => {
    const response = await request(app)
      .post("/api/devices/add-device")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addDevice);
    expect(response.statusCode).toBe(200);
  });
});

//testing datatype of data adding to database
describe("should return datatype of post request", () => {
  const addDevice = {
    device_id: "EC43431A",
    device_type: "ECU",
    user_id: "2",
    sim_number: "4567834567",
    status: "1",
  };
  test("testing datatype of post request", async () => {
    const response = await request(app)
      .post("/api/devices/add-device")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addDevice);

    expect(typeof response.body).toBe("object");
  });
});

//testing the data is added into database or not
describe("should return data from database for comparing ", () => {
  const expectedData = {
    device_id: "EC43431A",
  };
  test("testing data added is desired or not", async () => {
    const getQuery = "SELECT * FROM devices_master WHERE device_id=?";
    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [expectedData.device_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.device_id).toEqual(expectedData.device_id);
  });
});

//put request
//making request to update the data from database

describe("should return statuscode of put request", () => {
  const editData = {
    device_id: "FC222222A",
    device_type: "IoT",
    user_id: "2",
    sim_number: "923451456",
    status: "1",
  };
  test("testing the statuscode of put request", async () => {
    const id = 29;
    const response = await request(app)
      .put(`/api/devices/edit-device/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editData);
    expect(response.statusCode).toBe(200);
  });
});

//testing datatype of response

describe("testing the put request datatype", () => {
  const editData = {
    device_id: "FC222222A",
    device_type: "IoT",
    user_id: "2",
    sim_number: "923451456",
    status: "1",
  };
  test("testing the datatype of response", async () => {
    const id = 29;
    const response = await request(app)
      .put(`/api/devices/edit-device/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editData);
    expect(typeof response.body).toBe("object");
  });
});

//test the data updated in database is desired data or not
describe("should check data updated in database or not", () => {
  const expectedData = {
    device_id: "FC222222A",
  };
  test("testing the data updated is desired or not", async () => {
    const getQuery = "SELECT * FROM devices_master WHERE device_id=?";
    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [expectedData.device_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.device_id).toEqual(expectedData.device_id);
  });
});

//get which device assign to which customer
//get request

describe("Should return statuscode 200 of get request", () => {
  test("testing the statuscode of request", async () => {
    let user_id = 2;
    const response = await request(app)
      .get(`/api/devices/get-user-device/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("Should check datatype of body getting", () => {
  test("testing datatype of body getting from response", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/devices/get-user-device/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("Shuld return key of object returning", () => {
  test("testing response object from database", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/devices/get-user-device/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("idData");
  });
});

//testing the get request made to get data of particular device
//get request

describe("should get statuscode of request made", () => {
  test("testing the statuscode of request", async () => {
    const id = 1;
    const response = await request(app)
      .get(`/api/devices/get-device-card/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response", () => {
  test("testing the response body datatype", async () => {
    const id = 2;
    const response = await request(app)
      .get(`/api/devices/get-device-card/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("idData");
  });
});
