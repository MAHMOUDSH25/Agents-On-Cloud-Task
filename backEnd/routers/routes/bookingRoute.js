const express = require("express");
const bookingRoute = express.Router();

const {
  bookProduct,
  getBooking,
  updateBook,
  getUserBooking,
} = require("../controllers/booking");

const { authentication } = require("../middleware/authentication");

bookingRoute.post("/booking/:id", authentication, bookProduct);
bookingRoute.put("/booking/:id", authentication , updateBook);
bookingRoute.get("/booking/:id", authentication, getBooking);
bookingRoute.get("/booking", authentication, getUserBooking);


module.exports = bookingRoute;
