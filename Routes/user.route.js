const express = require("express");

const router = express.Router();
const {
  showWelcome,
  showRegister,
  loginUser,
  getDashboard,
} = require("../Controllers/user.controller");
router.get("/welcome", showWelcome);
router.post("/register", showRegister);
router.post("/login", loginUser);
router.get("/dashboard", getDashboard);
module.exports = router;
