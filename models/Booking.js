const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
    required: [true, "Please enter listing ID"],
    trim: true,
  },
  booking_id: {
    type: String,
    required: [true, "Please enter booking ID"],
    unique: [true, "That booking ID already exists"],
    trim: true,
  },
  booking_date: {
    type: Date,
    required: true,
    trim: true,
  },
  booking_start: {
    type: Date,
    required: true,
    trim: true,
  },
  booking_end: {
    type: Date,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
    trim: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
