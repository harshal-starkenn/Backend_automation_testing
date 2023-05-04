const express = require("express");
const { getMqttData } = require("./Controller/tripmqtt.js");
const { cronJob } = require("./Controller/Cron.js");
const cors = require("cors");
const { LoginRouter } = require("./Routes/login.js");
const { VehicleRouter } = require("./Routes/vehicles.js");
const { authetication } = require("./Middleware/authetication.js");
const { DevicesRouter } = require("./Routes/devices.js");
const { CustomerRoute } = require("./Routes/customer.js");
const { OngoingTripsRouter } = require("./Routes/ongoingTrips.js");
const { CompletedTripRoute } = require("./Routes/completedTrip.js");
const { UsersRouter } = require("./Routes/users.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
getMqttData();

setInterval(cronJob, 30 * 60 * 1000); // run cronjob every 30 mins

app.use("/api/login", LoginRouter);
app.use(authetication);
app.use("/api/vehicles", VehicleRouter);
app.use("/api/devices", DevicesRouter);
app.use("/api/customers", CustomerRoute);
app.use("/api/completedTrip", CompletedTripRoute);
app.use("/api/ongoingTrip", OngoingTripsRouter);
app.use("/api/users", UsersRouter);

// app.listen(9001, () => {
//   console.log("Listening on Port 9001");
// });

module.exports = { app };
