const express = require("express");
const userRoute = express.Router();

const { addUser, login } = require("../controllers/user");

userRoute.post("/signUp", addUser);
userRoute.post("/login", login);

module.exports = userRoute;
