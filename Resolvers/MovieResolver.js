const Movie = require("../models/movies.js");
const Comment = require("../models/comments.js");

module.exports = {
  Query: {
    movies: (parent, args, context, info) => {
      return Movie.find(args).then((films) => {
        return films.map((u) => ({ ...u._doc }));
      });
    },
  },
  Movie: {
    comments: (parent, args, context, info) => {
      const { _id } = parent;
      return Comment.find({ movie_id: _id })
        .limit(20)
        .then((comments) => {
          return comments.map((u) => ({ ...u._doc }));
        });
    },
  },
  // Mutation: {},
};
