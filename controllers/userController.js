const asyncHandler = require("express-async-handler")
const userModel = require("../models/userModel")

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }

    const userAvailable = await userModel.findOne({email})

    if(userAvailable){
        res.status(400)
        throw new Error("Email address already registered")
    }

    // hashed password


  res.json({ message: "Register a user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

//@desc Current user Info
//@route GET /api/users/current
//@access private

const currentUserInfo = asyncHandler(async (req, res) => {
  res.json({ message: "Current user info " });
});

module.exports = { registerUser, loginUser, currentUserInfo };
