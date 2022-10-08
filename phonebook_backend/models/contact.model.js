const { timeStamp } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    contactName: {
      type: "String",
      required: true,
      trim: true,
    },
    contactNumber: {
      type: "String",
      unique: true,
      required: true,
      trim: true,
    },
    userId: {
      type: "ObjectId",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
