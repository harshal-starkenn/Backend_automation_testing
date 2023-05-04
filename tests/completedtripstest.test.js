const request = require("supertest");
const { app } = require("../index.js");

//get request
//getting data by trip_id and event=LOC

describe("should return statuscode of get tripdata request", () => {
  test("testing the statuscode of request made", async () => {
    const id = "EC0998A1681361261";
    const response = await request(app)
      .get(`/api/completedTrip/getTripById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get tripdata request", () => {
  test("testing the datatype of request made", async () => {
    const id = "EC0998A1681361261";
    const response = await request(app)
      .get(`/api/completedTrip/getTripById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data from database ", () => {
  test("testing the data from  database", async () => {
    const id = "EC0998A1681361261";
    const response = await request(app)
      .get(`/api/completedTrip/getTripById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("device_id");
  });
});

//get request
//get tripsummary

describe("should return statuscode of get tripsummary request", () => {
  test("testing the statuscode of request made", async () => {
    const id = "EC0998A1677589272";
    const response = await request(app)
      .get(`/api/completedTrip/getTripSummaryById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get tripsummary request", () => {
  test("testing the datatype of request made", async () => {
    const id = "EC0998A1677589272";
    const response = await request(app)
      .get(`/api/completedTrip/getTripSummaryById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("avg_spd");
  });
});

describe("should return datatype of get tripsummary request", () => {
  test("testing the datatype of request made", async () => {
    const id = "EC0998A1677589272";
    const response = await request(app)
      .get(`/api/completedTrip/getTripSummaryById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

//get request
//getCompletedTrips/:user_id

describe("should return statuscode of get completedtrips request", () => {
  test("testing the statuscode of request made", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/completedTrip/getCompletedTrips/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get completedtrips request", () => {
  test("testing the datatype of request made", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/completedTrip/getCompletedTrips/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of get completedtrips request", () => {
  test("testing the data getting from database", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/completedTrip/getCompletedTrips/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("avg_spd");
  });
});

//get request
//getCompletedTripsByVehicleId

describe("should return statuscode of get completedtrips by vehicle_id request", () => {
  test("testing the statuscode of request made", async () => {
    const id = 5;
    const response = await request(app)
      .get(`/api/completedTrip/getCompletedTripsByVehicleId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get completedtrips by vehicle_id request", () => {
  test("testing the datatype of request made", async () => {
    const id = 5;
    const response = await request(app)
      .get(`/api/completedTrip/getCompletedTripsByVehicleId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of get completedtrips by vehicle_id request", () => {
  test("testing the data from database", async () => {
    const id = 5;
    const response = await request(app)
      .get(`/api/completedTrip/getCompletedTripsByVehicleId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("avg_spd");
  });
});

//get request
//get faultCounts

describe("should return statuscode of get request", () => {
  test("testing the statuscode of request made", async () => {
    const id = "EC0998A1677773185";
    const response = await request(app)
      .get(`/api/completedTrip/getFaultsByTripId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return statuscode of get request", () => {
  test("testing the statuscode of request made", async () => {
    const id = "EC0998A1677773185";
    const response = await request(app)
      .get(`/api/completedTrip/getFaultsByTripId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return statuscode of get request", () => {
  test("testing the statuscode of request made", async () => {
    const id = "EC0998A1677773185";
    const response = await request(app)
      .get(`/api/completedTrip/getFaultsByTripId/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("device_id");
  });
});
