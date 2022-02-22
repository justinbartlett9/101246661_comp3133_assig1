const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
    required: [true, "Please enter listing ID"],
    unique: [true, "That listing ID is already taken"],
    trim: true,
  },
  listing_title: {
    type: String,
    required: [true, "Please enter listing title"],
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: [true, "Please enter street"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
    trim: true,
  },
  postal_code: {
    type: String,
    required: [true, "Please enter postal code"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    //email validation
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
    trim: true,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
