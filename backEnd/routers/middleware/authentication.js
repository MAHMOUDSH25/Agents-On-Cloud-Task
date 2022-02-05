const jwt = require("jsonwebtoken");

//this function  to chick if the user have a valid token or not 
const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const valid = jwt.verify(token, "ABC");
    req.token = valid;
    next();
  } catch (error) {
    res.status(403).json("forbidden");
  }
};

module.exports = { authentication };
