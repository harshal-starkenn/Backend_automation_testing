const express = require("express");
const {
  endTripById,
  getOngoingTripdataById,
  getOngoingTrips,
} = require("../Controller/OngoingTripController.js");

const OngoingTripsRouter = express.Router();

OngoingTripsRouter.get("/getOngoingTrips/:user_id", getOngoingTrips);
OngoingTripsRouter.get("/getOngoingTripdataById/:id", getOngoingTripdataById);
OngoingTripsRouter.put("/endTripById/:id", endTripById);

module.exports = { OngoingTripsRouter };
