const express = require("express");
const {
  getCompletedTrips,
  getCompletedTripsAll,
  getFaultCountByTripId,
  getTripDataById,
  getCompletedTripsByVehicleId,
  getTripSummaryById,
} = require("../Controller/CompletedTripController.js");

const CompletedTripRoute = express.Router();

CompletedTripRoute.get("/getTripById/:id", getTripDataById);
CompletedTripRoute.get("/getTripSummaryById/:id", getTripSummaryById);
CompletedTripRoute.get("/getFaultsByTripId/:id", getFaultCountByTripId);
CompletedTripRoute.get(
  "/getCompletedTrips/:offset/:user_id",
  getCompletedTrips
);
CompletedTripRoute.get("/getCompletedTrips/:user_id", getCompletedTripsAll);
CompletedTripRoute.get(
  "/getCompletedTripsByVehicleId/:id",
  getCompletedTripsByVehicleId
);

module.exports = { CompletedTripRoute };
