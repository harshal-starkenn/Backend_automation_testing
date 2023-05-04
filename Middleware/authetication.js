const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authetication = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(500).send({ ErrorAuth: "Error in Authetication " });
    } else {
      // console.log("Verified");
      next();
    }
  });
};

module.exports = { authetication };
