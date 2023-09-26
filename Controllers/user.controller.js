const { user } = require("../Models/user.model");
// const nodemailer= require("nodemailer")
const jwt = require("jsonwebtoken");
const showWelcome = (req, res) => {
  res.send("Hello World!");
};

const showRegister = async (req, res) => {
  res.send("Showing Register!");
  let newUser = user(req.body);
  await newUser.save();
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  user
    .findOne({ email })
    .then((user) => {
      user.comparedPassword(password, (err, isMatch) => {
        let schoolportal = process.env.SECRET;
        if (isMatch) {
          // res.send({ status: true, message: "User found", });
          jwt.sign(
            { email },
            schoolportal,
            { expiresIn: "9h" },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                console.log(token);
                res.send({ status: true, message: "user found", token: token });
              }
            }
          );
        } else {
          res.send({ status: false, message: "User not found" });
        }
      });
    })
    .catch((e) => {
      console.log("User not found");
    });
};
const getDashboard = (req, res) => {
  let schoolportal = process.env.SECRET;
  console.log(req.headers.authorization.split(" ")[2]);
  const token = req.headers.authorization.split(" ")[2];
  jwt.verify(token, schoolportal, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("Correct");
    }
  });
  // res.send("I dey woks");
};
module.exports = { showWelcome, showRegister, loginUser, getDashboard };
