const bookingModel = require("../../db/models/bookingModel");
const bookingRoute = require("../routes/bookingRoute");

const bookProduct = async (req, res) => {
  try {
    const userId = req.token.userId;
    const productId = req.params.id;
    const date = req.body.date;
    const newBooking = new bookingModel({
      product: productId,
      userId: userId,
      date: date,
      status: "pending",
    });
    const saveBooking = await newBooking.save();
    res.status(201).json(saveBooking);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getBooking = async (req, res) => {
  try {
    const productId = req.params.id;
    const booking = await bookingModel
      .find({
        product: productId,
      })
      .populate("userId", "name email")
      .sort({ date: 1 });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const BookingId = req.params.id;
    const { newStatus } = req.body;
    const updatedBooking = await bookingModel
      .findOneAndUpdate(
        { _id: BookingId },
        { status: newStatus },
        { new: true }
      )
      .populate("userId", "name email");
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserBooking = async (req, res) => {
  try {
    const userId = req.token.userId;
    const userBooking = await bookingModel.find({ userId: userId });
    res.status(200).json(userBooking);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { bookProduct, getBooking, updateBook, getUserBooking };
