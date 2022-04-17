import User from "../models/users.js";

export const getAllUsers = (parent, args, context, info) => {
  return User.find().then((users) => {
    return users.map((u) => ({ ...u._doc }));
  });
};
