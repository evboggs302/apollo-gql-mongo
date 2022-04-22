const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    awards: {
      wins: Number,
      nominations: Number,
      text: String,
    },
    cast: [String],
    countries: [String],
    directors: [String],
    plot: String,
    fullPlot: String,
    genres: [String],
    imdb: {
      rating: Number,
      votes: Number,
      id: Number,
    },
    type: String,
    languages: [String],
    lastUpdated: String,
    year: Number,
    num_mflix_comments: Number,
    poster: String,
    rated: String,
    released: String,
    runtime: Number,
    tomatoes: {
      viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number,
      },
      production: String,
      lastUpdated: String,
    },
    writers: [String],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Movie", movieSchema, "movies"); // modelName, schemaName, collectionName
