import User from "../models/users.js";

export const getAllUsers = (parent, args, context, info) => {
  return User.find().then((users) => {
    return users.map((u) => ({ ...u._doc }));
  });
};

export const getSingleUser = (parent, args, context, info) => {
  const { id } = args;
  return User.findById(id).then((user) => {
    // const { _id, name, email } = user;
    return user;
  });
};
