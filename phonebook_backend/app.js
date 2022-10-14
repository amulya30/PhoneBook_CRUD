require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

app.use(cors());

//Adding JSON Support for data exchange
app.use(express.json());

//Mongo DB Connection Support
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection with DB Successful!");
});

//Route Imports
const usersRouter = require("./routes/users");
const addcontactRouter = require("./routes/contacts");

//Routes
app.use("/users", usersRouter);
app.use("/contacts", addcontactRouter);

// Port mentioned for the server to run on it
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend Service is running on PORT", PORT);
});
