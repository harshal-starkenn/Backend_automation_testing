const { db } = require("../Config/db.js");
const bcrypt = require("bcryptjs");

//////////////////////Getting Customers from user_id /////////////////////
const getall = (req, res) => {
  const { user_id } = req.params;

  const getQuery = "SELECT * FROM customer_master WHERE user_id=?";

  db.query(getQuery, [user_id], (err, data) => {
    if (err) {
      res.status(500).send({ Error: err });
    } else {
      res.status(200).send({ getData: data });
    }
  });
};

//////////////////////Adding Master_Customer Data/////////////////////

const addCustomer = (req, res) => {
  const { user_id } = req.params;

  const checkQuery = "SELECT * FROM customer_master WHERE user_id=?";

  db.query(checkQuery, [user_id], (checkerr, result) => {
    if (checkerr) {
      res.status(500).send({ Error: checkerr });
    } else {
      if (result.length > 0) {
        res.status(500).send("Customer Already Exists");
      } else {
        const insertQuery =
          "INSERT INTO customer_master(`user_id`,`company_name`,`address`,`state`,`city`,`pincode`,`phone`,`status`,`created_at`) VALUES(?,?,?,?,?,?,?,?,NOW()) ";

        const values = [
          user_id,
          req.body.company_name,
          req.body.address,
          req.body.state,
          req.body.city,
          req.body.pincode,
          req.body.phone,
          req.body.status,
        ];

        db.query(insertQuery, values, (err, data) => {
          if (err) {
            res.status(500).send({ Errorpost: err });
          } else {
            res.status(200).send({ master_customerData: data });
          }
        });
      }
    }
  });
};

//////////////////////Editing Master_customer Data using user_id && customer_id /////////////////////

const editCustomer = (req, res) => {
  const { customer_id } = req.params;

  let { ...columns } = req.body;

  let updateQuery = `UPDATE customer_master SET `;
  let updateData = [];

  Object.keys(columns).forEach((key, index) => {
    updateQuery += `${key}=?`;
    updateData.push(columns[key]);

    if (index < Object.keys(columns).length - 1) {
      updateQuery += ", ";
    }
  });

  updateQuery += `WHERE customer_id=?`;
  updateData.push(customer_id);

  db.query(updateQuery, updateData, (error, results, fields) => {
    if (error) throw error;
    res.send({ editResult: results });
  });
};
//////////////////getting all the users for admin side///////

const getallusers = (req, res) => {
  const queryall = "SELECT * from users";

  db.query(queryall, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ usersData: data });
    }
  });
};

//////////Adding users in admin side

const addUsers = (req, res) => {
  const checkuserQuery = "SELECT * FROM users WHERE  username=? OR email=? ";

  db.query(checkuserQuery, [req.body.username, req.body.email], (err, data) => {
    if (err) {
      res.send({ ErrorCheckUser: err });
    } else {
      if (data.length > 0) {
        res.status(501).send("User Already Exists");
      } else {
        bcrypt.hash(req.body.password, 4, function (err, hash) {
          if (err) {
            res.status(500).send({ ErrorHashPass: err });
          } else {
            let user_type = 2;
            const insertUserQuery =
              "INSERT INTO users(`first_name`,`last_name`,`username`,`email`,`password`,`user_type`,`status`) VALUES (?)";

            const values = [
              req.body.first_name,
              req.body.last_name,
              req.body.username,
              req.body.email,
              hash,
              user_type,
              req.body.status,
            ];

            db.query(insertUserQuery, [values], (err, userData) => {
              if (err) {
                res.status(500).send({ ErrorUser: err });
              } else {
                res.status(200).send({ SignupData: userData });
              }
            });
          }
        });
      }
    }
  });
};

//////////////Editing the Users data

const editUser = (req, res) => {
  let { user_id } = req.params;
  let { ...columns } = req.body;
  bcrypt.hash(req.body.password, 4, function (err, hash) {
    let updateQuery = `UPDATE users SET `;
    let updateData = [];

    Object.keys(columns).forEach((key, index) => {
      updateQuery += `${key}=?`;
      updateData.push(columns[key]);

      if (index < Object.keys(columns).length - 1) {
        updateQuery += ", ";
      }
    });

    updateQuery += `WHERE user_id=?`;
    updateData.push(user_id);

    db.query(updateQuery, updateData, (error, results, fields) => {
      if (error) throw error;
      res.send({ editResult: results });
    });
  });
};

//////////////////get user data by user_id

const getuserById = (req, res) => {
  const { user_id } = req.params;
  const getQuery = "SELECT * FROM users WHERE user_id=?";

  db.query(getQuery, [user_id], (err, data) => {
    if (err) {
      res.status(500).send({ ErrorIdGet: err });
    } else {
      res.status(200).send({ IdData: data });
    }
  });
};

const getCustomerDetailByUserId = (req, res) => {
  const { user_id } = req.params;
  const getQuery = "SELECT * FROM customer_master WHERE user_id=?";

  db.query(getQuery, [user_id], (err, data) => {
    if (err) {
      res.status(500).send({ ErrorIdGet: err });
    } else {
      res.status(200).send({ IdData: data });
    }
  });
};

module.exports = {
  getall,
  addCustomer,
  editCustomer,
  getallusers,
  addUsers,
  editUser,
  getuserById,
  getCustomerDetailByUserId,
};
