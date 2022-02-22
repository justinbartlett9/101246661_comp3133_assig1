const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Booking = require("./models/Booking");

const resolvers = {
  login: async (args) => {
    return User.findOne({ username: args.username }).then((user) => {
      if (!user) {
        return "user not found";
      }
      if (args.password !== user.password) {
        return "password is incorrect";
      }
      let token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          type: user.type,
        },
        "secret",
        { expiresIn: "1000000" }
      );
      return token;
    });
  },
  getUsers: async () => {
    return await User.find();
  },
  getListings: async () => {
    return await Listing.find();
  },
  searchListings: async (args) => {
    let reg = {
      $or: [
        { username: { $regex: args.query, $options: "i" } },
        { city: { $regex: args.query, $options: "i" } },
        { postal_code: { $regex: args.query, $options: "i" } },
      ],
    };
    return await Listing.find(reg);
  },
  getUserBookings: async (args, req) => {
    let token = req.headers.jwt;
    return jwt.verify(token, "secret", async (err) => {
      if (err) {
        return "invalid token";
      } else {
        return await Booking.find({ username: jwt.decode(token).username });
      }
    });
  },
  getAdminListings: async (args, req) => {
    let token = req.headers.jwt;
    return jwt.verify(token, "secret", async (err) => {
      if (err) {
        return "invalid token";
      } else {
        return await Listing.find({
          username: jwt.decode(token).username,
        });
      }
    });
  },
  addUser: async (args) => {
    let user = new User({
      username: args.username,
      firstname: args.firstname,
      lastname: args.lastname,
      password: args.password,
      email: args.email,
      type: args.type,
    });
    return user.save();
  },
  addListing: async (args, req) => {
    let token = req.headers.jwt;
    return jwt.verify(token, "secret", async (err) => {
      if (err) {
        return "invalid token";
      } else {
        let payload = jwt.decode(token);

        if (payload.type !== "admin") {
          return "unauthorized access";
        }

        let listing = new Listing({
          listing_id: args.listing_id,
          listing_title: args.listing_title,
          description: args.description,
          street: args.street,
          city: args.city,
          postal_code: args.postal_code,
          price: args.price,
          email: args.email,
          username: payload.username,
        });
        await listing.save();
        return "listing added";
      }
    });
  },
  addBooking: async (args, req) => {
    let token = req.headers.jwt;
    return jwt.verify(token, "secret", async (err) => {
      if (err) {
        return "invalid token";
      } else {
        let payload = jwt.decode(token);

        let booking = new Booking({
          listing_id: args.listing_id,
          booking_id: args.booking_id,
          booking_date: Date.parse(args.booking_date),
          booking_start: Date.parse(args.booking_start),
          booking_end: Date.parse(args.booking_end),
          username: payload.username,
        });
        await booking.save();
        return "booking added";
      }
    });
  },
};

module.exports = resolvers;
