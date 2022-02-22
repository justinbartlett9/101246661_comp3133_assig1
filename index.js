var express = require("express");
var mongoose = require("mongoose");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var mongodb_atlas_url =
  "mongodb+srv://justin:comp3123@comp3123.iohhl.mongodb.net/101246661_comp3133_assig1?retryWrites=true&w=majority";

const resolvers = require("./resolvers");

var schema = buildSchema(
  `type Query {
      getUsers: [User],
      getListings: [Listing],
      searchListings(query: String): [Listing],
      getUserBookings: [Booking],
      getAdminListings: [Listing]
  },
  type Mutation {
      login(
          username: String, 
          password: String
          ): String,
      addUser(
          username: String,
          firstname: String,
          lastname: String,
          password: String,
          email: String,
          type: String
      ): User,
      addListing(
          listing_id: String,
          listing_title: String,
          description: String,
          street: String,
          city: String,
          postal_code: String,
          price: Float,
          email: String
      ): String,
      addBooking(
        listing_id: String,
        booking_id: String,
        booking_date: String,
        booking_start: String,
        booking_end: String,
        username: String
      ): String
  },
  type User {
        username: String,
        firstname: String,
        lastname: String,
        password: String,
        email: String,
        type: String
    },
    type Listing {
        listing_id: String,
        listing_title: String,
        description: String,
        street: String,
        city: String,
        postal_code: String,
        price: Float,
        email: String,
        username: String
    }, 
    type Booking {
        listing_id: String,
        booking_id: String,
        booking_date: String,
        booking_start: String,
        booking_end: String,
        username: String
    }`
);

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

mongoose
  .connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB");
  });

app.listen(4020, () =>
  console.log("Express GraphQL server running at port 4020")
);
