const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
    unique: [true, "That username is already taken"],
    trim: true,
  },
  firstname: {
    type: String,
    required: [true, "Please enter first name"],
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: 6,
    trim: true,
    //password validation
    validate: function (value) {
      var passwordRegex = /^[A-Za-z0-9#$&_]+$/;
      return passwordRegex.test(value);
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Another user has registed with that email address"],
    trim: true,
    //email validation
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  type: {
    type: String,
    enum: ["admin", "customer"],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
