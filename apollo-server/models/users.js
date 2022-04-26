const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema, "users"); // modelName, schemaName, collectionName
