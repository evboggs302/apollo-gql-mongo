const { gql } = require("apollo-server-express");

const user = gql`
  type Query {
    allUsers: [User]
    user(id: ID!): User
  }
  type User {
    _id: ID!
    name: String
    email: String
    password: String
  }
`;

module.exports = user;
