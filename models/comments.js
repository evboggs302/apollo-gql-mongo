const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
    email: String,
    movie_id: String,
    name: String,
    text: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Comment", commentSchema, "comments"); // modelName, schemaName, collectionName
