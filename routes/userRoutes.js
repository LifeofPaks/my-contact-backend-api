const express = require("express");
const validateToken = require("../middleware/validateTokenHandler")
const {
  registerUser,
  loginUser,
  currentUserInfo,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken, currentUserInfo,);

module.exports = router;
