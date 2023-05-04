const request = require("supertest");
const { app } = require("../index.js");
const { db } = require("../Config/db.js");

//get request
//get list of ongoingtrips from the database

describe("should return statuscode of get ongoing_trips", () => {
  test("testing the statuscode of request made", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/ongoingTrip/getOngoingTrips/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of get ongoing_trips", () => {
  test("testing the datatype of request made", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/ongoingTrip/ongoingTrip/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of get ongoing_trips", () => {
  test("testing the data from database of request made", async () => {
    const user_id = 2;
    const response = await request(app)
      .get(`/api/ongoingTrip/getOngoingTrips/${user_id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("avg_spd");
  });
});

//get request
//getting data of particular trip

describe("Should return desired data", () => {
  test("testing the desired data got by making get request", async () => {
    const id = "EC0998A1677749742";
    const response = await request(app)
      .get(`/api/ongoingTrip/getOngoingTripdataById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(response.body[0]).toHaveProperty("device_id");
  });
});

describe("Should return datatype of get request made", () => {
  test("testing the datatype of get request ", async () => {
    const id = "EC0998A1677749742";
    const response = await request(app)
      .get(`/api/ongoingTrip/getOngoingTripdataById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );
    expect(typeof response.body).toBe("object");
  });
});

describe("Should return statuscode of get request made", () => {
  test("ongoing trips", async () => {
    const id = "EC0998A1677749742";
    const response = await request(app)
      .get(`/api/ongoingTrip/getOngoingTripdataById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      );

    expect(response.statusCode).toBe(200);
  });
});

//put request
//end trip request

describe("should return statuscode of put request made", () => {
  const updatedData = {
    trip_status: "1",
  };
  test("testing the response of the put request made ", async () => {
    const id = "EC0998A1677589272";
    const response = await request(app)
      .put(`/api/ongoingTrip/endTripById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(updatedData);
    expect(response.statusCode).toBe(200);
  });
});

describe("should return datatype of put request made", () => {
  const updatedData = {
    trip_status: "1",
  };
  test("testing the datatype of request", async () => {
    const id = "EC0998A1677589272";
    const response = await request(app)
      .put(`/api/ongoingTrip/endTripById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(updatedData);
    expect(typeof response.body).toBe("object");
  });
});

describe("should return data of put request made", () => {
  const updatedData = {
    trip_status: "1",
  };
  test("testing the data from database ", async () => {
    const id = "EC0998A1677589272";
    const response = await request(app)
      .put(`/api/ongoingTrip/endTripById/${id}`)
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODEyMTUzNTB9.7U_QYQowpQWv2IcTKBT_StgHcyJxq1T-ghiKkmwbFAg"
      )
      .send(updatedData);
    expect(response.body).toHaveProperty("message");
  });
});
