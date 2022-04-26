const { ApolloError } = require("apollo-server-express");

const errHandler = (err) => {
  switch (err.extensions.code) {
    case "GRAPHQL_VALIDATION_FAILED":
      return new ApolloError("We are having some trouble.", "Error1", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "INTERNAL_SERVER_ERROR":
      return new ApolloError("We are having some trouble.", "Error2", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "GRAPHQL_PARSE_FAILED":
      return new ApolloError("We are having some trouble.", "Error3", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "BAD_USER_INPUT":
      return new ApolloError("We are having some trouble.", "Error4", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "UNAUTHENTICATED":
      return new ApolloError("We are having some trouble.", "Error5", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "FORBIDDEN":
      return new ApolloError("We are having some trouble.", "Error6", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "PERSISTED_QUERY_NOT_FOUND":
      return new ApolloError("We are having some trouble.", "Error7", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    case "PERSISTED_QUERY_NOT_SUPPORTED":
      return new ApolloError("We are having some trouble.", "Error8", {
        token: "some_unique_token",
        originalErrMsg: err.message,
      });
    default:
      return err;
  }
};

module.exports = errHandler;
