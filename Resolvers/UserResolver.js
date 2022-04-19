const User = require("../models/users.js");

const getAllUsers = (parent, args, context, info) => {
  return User.find().then((users) => {
    return users.map((u) => ({ ...u._doc }));
  });
};

const getSingleUser = (parent, args, context, info) => {
  const { id } = args;
  return User.findById(id).then((user) => {
    // const { _id, name, email } = user;
    return user;
  });
};

module.exports = {
  Query: {
    allUsers: (parent, args, context, info) => {
      return User.find().then((users) => {
        return users.map((u) => ({ ...u._doc }));
      });
    },
    user: (parent, args, context, info) => {
      const { id } = args;
      return User.findById(id).then((user) => {
        // const { _id, name, email } = user;
        return user;
      });
    },
  },
  // Mutation: {},
};
