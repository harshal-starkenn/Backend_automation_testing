const request = require("supertest");
const { app } = require("../index.js");
const { db } = require("../Config/db.js");

//get request
describe("should return statuscode of request made", () => {
  test("testing the statuscode of request", async () => {
    const response = await request(app)
      .get("/api/vehicles/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response body", () => {
  test("testing the datatype of response body", async () => {
    const response = await request(app)
      .get("/api/vehicles/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(typeof response.body).toBe("object");
  });
});

describe("should return key of response object", () => {
  test("testing the key of response object", async () => {
    const response = await request(app)
      .get("/api/vehicles/getall")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .set("Content-Type", "application/json");
    expect(response.body).toHaveProperty("getData");
  });
});

//post request

describe("checking statuscode of add request made to add vehicle", () => {
  const addVehicle = {
    vehicle_name: "verna",
    vehicle_registration: "MH07UI9988",
    ecu: "EC876543A",
    iot: "FC876543A",
    dms: "DMS12312A",
    featureset: "1",
    status: "1",
  };
  test("testing the statuscode of post request to add vehicle", async () => {
    const user_id = 2;
    const response = await request(app)
      .post(`/api/vehicles/addvehicle/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addVehicle);
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response body", () => {
  const addVehicle = {
    vehicle_name: "verna",
    vehicle_registration: "MH07UI9988",
    ecu: "EC876543A",
    iot: "FC876543A",
    dms: "DMS12312A",
    featureset: "1",
    status: "1",
  };
  test("testing the datatype of response body", async () => {
    const user_id = 2;
    const response = await request(app)
      .post(`/api/vehicles/addvehicle/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(addVehicle);
    expect(typeof response.body).toBe("object");
  });
});

describe("should check data added in database or not", () => {
  const addVehicle = {
    vehicle_name: "verna",
    vehicle_registration: "MH07UI9988",
    ecu: "EC876543A",
    iot: "FC876543A",
    dms: "DMS12312A",
    featureset: "1",
    status: "1",
  };
  test("testing data saved in database or not", async () => {
    const getQuery = "SELECT * FROM vehicle_master WHERE vehicle_name=?";
    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [addVehicle.vehicle_name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    expect(data.vehicle_name).toEqual(addVehicle.vehicle_name);
  });
});

//put request

describe("should return statuscode response of put request made", () => {
  const editData = {
    vehicle_name: "carnival",
    vehicle_registration: "MH09WE4554",
  };
  test("testing the statuscode response of request", async () => {
    const user_id = 2;
    const vehicle_id = 11;
    const response = await request(app)
      .put(`/api/vehicles/editvehicle/${user_id}/${vehicle_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editData);

    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of response body", () => {
  const editData = {
    vehicle_name: "carnival",
    vehicle_registration: "MH09WE4554",
  };
  test("testing the datatype of the response body", async () => {
    const user_id = 2;
    const vehicle_id = 11;
    const response = await request(app)
      .put(`/api/vehicles/editvehicle/${user_id}/${vehicle_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editData);

    expect(typeof response.body).toBe("object");
  });
});

describe("should return data when request made", () => {
  const editData = {
    vehicle_name: "carnival",
    vehicle_registration: "MH09WE4554",
  };
  test("testing the data from database", async () => {
    const user_id = 2;
    const vehicle_id = 11;
    const response = await request(app)
      .put(`/api/vehicles/editvehicle/${user_id}/${vehicle_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(editData);

    expect(response.body).toHaveProperty("editResult");
  });
});

describe("should return data from database", () => {
  const editData = {
    vehicle_name: "carnival",
    vehicle_registration: "MH09WE4554",
  };
  test("testing the data we send and data stored in database", async () => {
    const getQuery = "SELECT * FROM vehicle_master WHERE vehicle_name=?";
    const data = await new Promise((resolve, reject) => {
      db.query(getQuery, [editData.vehicle_name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    expect(data.vehicle_name).toEqual(editData.vehicle_name);
  });
});

//get request
//getiing data of particular vehicle

describe("Should return statuscode of get request made", () => {
  test("testing the statuscode of the get request made ", async () => {
    const vehicle_id = 2;
    const response = await request(app)
      .get(`/api/vehicles/vehicle-card/${vehicle_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );

    expect(response.statusCode).toBe(200);
  });
});

describe("Should return datatype of get request made", () => {
  test("testing the datatype of request made", async () => {
    const vehicle_id = 2;
    const response = await request(app)
      .get(`/api/vehicles/vehicle-card/${vehicle_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );

    expect(typeof response.body).toBe("object");
  });
});

describe("Should return data from get request made", () => {
  test("testing the data from database", async () => {
    const vehicle_id = 2;
    const response = await request(app)
      .get(`/api/vehicles/vehicle-card/${vehicle_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );

    expect(response.body).toHaveProperty("IdData");
  });
});

//get request
//get data of vehicles assign to particular customer

describe("Should return statuscode of request made", () => {
  test("testing the statuscode of get request made", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/vehicles/user-vehicle/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("Should return datatype of request made", () => {
  test("testing the datatype of response", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/vehicles/user-vehicle/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("Should return data from request", () => {
  test("testing the data from database", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/vehicles/user-vehicle/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("VehiData");
  });
});

//get request
//get iot device data from database which are not assign to any vehicle

describe("should return statuscode of get iot devices request made", () => {
  test("testing statuscode of the get request made", async () => {
    const response = await request(app)
      .get(`/api/vehicles/get-iot`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get iot devices request made", () => {
  test("testing datatype of the get request made", async () => {
    const response = await request(app)
      .get(`/api/vehicles/get-iot`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of get iot devices request made", () => {
  test("testing data from database ", async () => {
    const response = await request(app)
      .get(`/api/vehicles/get-iot`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("IotData");
  });
});

//get request
//request made to get data of ecu devices not assign to any vehicle

describe("Should return statuscode of get ecu device request ", () => {
  test("testing the statuscode of get request made", async () => {
    const response = await request(app)
      .get("/api/vehicles/get-ecu")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("Should return datatype of get ecu device request ", () => {
  test("testing the datatype of get response", async () => {
    const response = await request(app)
      .get("/api/vehicles/get-ecu")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("Should return data of get ecu device request ", () => {
  test("testing the data from database", async () => {
    const response = await request(app)
      .get("/api/vehicles/get-ecu")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("ECUData");
  });
});

//get request
//get the data of dms devices which are not assign to any vehicle

describe("should return statuscode of get dms device request made", () => {
  test("testing the statuscode of request made", async () => {
    const response = await request(app)
      .get("/api/vehicles/get-dms")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get dms device request made", () => {
  test("testing the datatype of request made", async () => {
    const response = await request(app)
      .get("/api/vehicles/get-dms")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of get dms device request made", () => {
  test("testing the data from database ", async () => {
    const response = await request(app)
      .get("/api/vehicles/get-dms")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body).toHaveProperty("DMSdata");
  });
});

//get request
//getting the data of vehicle by trip_id

describe("should return statuscode of request made", () => {
  test("testing the statuscode of the request made", async () => {
    const id = "EC0998A1677759085";
    const response = await request(app)
      .get(`/api/vehicles/getVehicleByTripId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of request made", () => {
  test("testing the datatype of the request made", async () => {
    const id = "EC0998A1677759085";
    const response = await request(app)
      .get(`/api/vehicles/getVehicleByTripId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of request made", () => {
  test("testing the data from database", async () => {
    const id = "EC0998A1677759085";
    const response = await request(app)
      .get(`/api/vehicles/getVehicleByTripId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("avg_spd");
  });
});
