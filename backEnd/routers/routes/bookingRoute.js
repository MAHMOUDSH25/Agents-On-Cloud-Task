const express = require("express");
// defined productRoute from express
const bookingRoute = express.Router();

// require all action functions from controller
const {
  bookProduct,
  getBooking,
  updateBook,
  getUserBooking,
} = require("../controllers/booking");

const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

// here we use first authentication to chick if the user have a valid token
// then use authorization to chick if user are authorize or not
bookingRoute.post("/booking/:id", authentication,authorization("buyer"), bookProduct);
bookingRoute.put("/booking/:id", authentication, authorization("seller"), updateBook);
// this route to get all booking for one product from different buyers 
bookingRoute.get("/booking/:id", authentication, authorization("seller"), getBooking);
// this route to get all booking for different products for one buyer 
bookingRoute.get("/booking", authentication ,authorization("buyer"), getUserBooking);

module.exports = bookingRoute;
