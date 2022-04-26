const User = require("../models/users.js");
const Comment = require("../models/comments.js");

module.exports = {
  Query: {
    comments: (parent, args, context, info) => {
      return Comment.find(args)
        .limit(20)
        .then((comments) => {
          return comments.map((u) => ({ ...u._doc }));
        });
    },
  },
  Comment: {
    userInfo: (parent, args, context, info) => {
      const { email } = parent;
      return User.find({ email }).then((user) => {
        delete user.password;
        return user;
      });
    },
  },
  // Mutation: {},
};
