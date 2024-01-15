const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); //npm i bcryptjs
const jwt = require("jsonwebtoken"); //npm i jsonwebtoken

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await userModel.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email address already registered");
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Hashed Password ${hashedPassword}`);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error({ message: "User not found" });
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
const {email, password} = req.body
if(!email || !password){
    res.status(400)
    throw new Error("All fields are mandatory!")
}

const user = await userModel.findOne({email})
console.log(user)
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201)
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        )

        res.json({accessToken})
    } else{
        res.status(401)
        throw new Error("Email or Password is not valid")
    }
});

//@desc Current user Info
//@route GET /api/users/current
//@access private

const currentUserInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo };
