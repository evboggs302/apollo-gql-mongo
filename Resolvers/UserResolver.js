const User = require("../models/users.js");
const Comment = require("../models/comments.js");

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
      const { id } = args;
      return User.findById(id).then((user) => {
        // const { _id, name, email } = user;
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
  // Mutation: {},
};
