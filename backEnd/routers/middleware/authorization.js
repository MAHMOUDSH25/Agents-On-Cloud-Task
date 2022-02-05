// this function to chick if user are authorize or not
const authorization = (requiredUserType) => {
  return (req, res, next) => {
    const userType = req.token.type;
    if (userType === requiredUserType) next();
    else res.status(403).json("forbidden");
  };
};

module.exports = { authorization };
