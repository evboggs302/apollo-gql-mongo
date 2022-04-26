const { ApolloError } = require("apollo-server-express");
const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const User = require("../models/users.js");
const Comment = require("../models/comments.js");
const Movie = require("../models/movies.js");

module.exports = {
  Query: {
    allUsers: (parent, args, context, info) => {
      return User.find()
        .limit(20)
        .then((users) => {
          return users.map((u) => {
            delete u.password;
            return { ...u._doc };
          });
        });
    },
    user: (parent, args, context, info) => {
      try {
        const { id } = args;
        return User.findById(mongoose.Types.ObjectId(id)).then((user) => {
          delete user.password;
          return user;
        });
      } catch (err) {
        return new ApolloError("Unable to find user.", "NOT_FOUND", {
          token: "some_unique_token",
          originalErrMsg: err.message,
        });

        // Alternative to above way of throwing errors to client
        // return { code: "", originalErrMsg: "", token: "" };
      }
    },
  },
  Mutation: {
    addNewUser: async (parent, args, context, info) => {
      const { name, email, password } = args.new_user;
      const hashedPw = Bcrypt.hashSync(password, 12);
      const id = new mongoose.Types.ObjectId();
      const newUser = new User({
        _id: id,
        name: name,
        email: email,
        password: hashedPw,
        favorites: [],
      });
      await newUser.save();
      return User.findById(id).then((user) => {
        delete user.password;
        return user;
      });
    },
    addFavMovie: async (parent, args, context, info) => {
      const { user_id, movie_id } = args;
      const u_id = mongoose.Types.ObjectId(user_id);
      const m_id = mongoose.Types.ObjectId(movie_id);
      await User.updateOne(
        { _id: user_id },
        { $addToSet: { favorites: [m_id] } }
      );
      return User.findById(u_id).then((user) => {
        delete user.password;
        return user;
      });
    },
    removeFavMovie: async (parent, args, context, info) => {
      const { user_id, movie_id } = args;
      const u_id = mongoose.Types.ObjectId(user_id);
      const m_id = mongoose.Types.ObjectId(movie_id);
      await User.updateOne({ _id: user_id }, { $pull: { favorites: m_id } });
      return User.findById(u_id).then((user) => {
        delete user.password;
        return user;
      });
    },
  },
  User: {
    comments: (parent, args, context, info) => {
      const { email } = parent;
      return Comment.find({ email }).then((comments) => {
        return comments.map((u) => ({ ...u._doc }));
      });
    },
  },
  UserOrUserErr: {
    __resolveType(obj) {
      if (obj.code) {
        return "Error";
      }
      return "User";
    },
  },
};
