const express = require("express");
const userRoute = express.Router();

const { signUp, login } = require("../controllers/user");

userRoute.post("/signUp", signUp);
userRoute.post("/login", login);

module.exports = userRoute;
