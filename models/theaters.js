const mongoose = require("mongoose");
const theaterSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
    theaterId: Number,
    location: {
      address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        zipcode: String,
      },
      geo: {
        type: String,
        coordinates: [Number, Number],
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Theater", theaterSchema, "theaters"); // modelName, schemaName, collectionName
