const { db } = require("../Config/db.js");

const getTripDataById = (req, res) => {
  const tripId = req.params.id;

  const q =
    "SELECT * FROM tripdata WHERE trip_id = ? AND event = ? ORDER BY timestamp ASC";
  let event = "LOC";
  db.query(q, [tripId, event], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getFaultCountByTripId = (req, res) => {
  const tripID = req.params.id;

  const q =
    "SELECT * FROM tripdata WHERE trip_id = ? AND event != 'IGS' AND event != 'NSQ' AND event != 'LOC' AND event != 'RFID'";

  db.query(q, [tripID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getCompletedTrips = (req, res) => {
  let { offset, user_id } = req.params;

  // "SELECT * FROM trip_summary INNER JOIN vehicle_master ON vehicle_master.vehicle_id=trip_summary.vehicle_id WHERE trip_summary.user_id = ? AND trip_summary.trip_status = ? ORDER BY trip_summary.id DESC  ";
  const q = `SELECT * FROM trip_summary INNER JOIN vehicle_master ON vehicle_master.vehicle_id=trip_summary.vehicle_id WHERE trip_summary.user_id = ? AND trip_summary.trip_status = ? ORDER BY trip_summary.id DESC LIMIT 10 OFFSET ${offset}`;
  const status = 1;
  db.query(q, [user_id, status], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
};
const getCompletedTripsAll = (req, res) => {
  let { offset, user_id } = req.params;

  const q = `SELECT * FROM trip_summary INNER JOIN vehicle_master ON vehicle_master.vehicle_id=trip_summary.vehicle_id WHERE trip_summary.user_id = ? AND trip_summary.trip_status = ? ORDER BY trip_summary.id DESC`;
  const status = 1;
  db.query(q, [user_id, status], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
};

const getCompletedTripsByVehicleId = (req, res) => {
  let vehicleId = req.params.id;

  const q = `SELECT * FROM trip_summary INNER JOIN vehicle_master ON vehicle_master.vehicle_id=trip_summary.vehicle_id WHERE trip_summary.trip_status = ? AND vehicle_master.vehicle_id = ? ORDER BY trip_summary.id DESC`;
  const status = 1;
  db.query(q, [status, vehicleId], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
};

const getTripSummaryById = (req, res) => {
  const tripId = req.params.id;

  const q = "SELECT * FROM trip_summary WHERE trip_id = ?";

  db.query(q, [tripId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

module.exports = {
  getTripDataById,
  getFaultCountByTripId,
  getCompletedTrips,
  getCompletedTripsAll,
  getCompletedTripsByVehicleId,
  getTripSummaryById,
};
