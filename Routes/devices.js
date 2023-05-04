const express = require("express");
const {
  addDevice,
  deleteDevice,
  editDevice,
  getall,
  getdevice,
  getuserDevice,
} = require("../Controller/DevicesController.js");
const DevicesRouter = express.Router();

DevicesRouter.get("/getall", getall);

DevicesRouter.post("/add-device", addDevice);

DevicesRouter.put("/edit-device/:id", editDevice);

DevicesRouter.delete("/delete-device/:id", deleteDevice);

DevicesRouter.get("/get-user-device/:user_id", getuserDevice);

DevicesRouter.get("/get-device-card/:id", getdevice);

module.exports = { DevicesRouter };
