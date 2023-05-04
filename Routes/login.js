const express = require("express");

const { login } = require("../Controller/LoginController.js");

const LoginRouter = express.Router();

LoginRouter.post("/login-user", login);

module.exports = { LoginRouter };
