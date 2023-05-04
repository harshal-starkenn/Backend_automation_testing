const express = require("express");
const { getAllUsers } = require("../Controller/UserController.js");
const UsersRouter = express.Router();

UsersRouter.get("/get-all-users", getAllUsers);

module.exports = { UsersRouter };
