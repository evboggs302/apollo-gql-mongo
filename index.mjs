import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { getAllUsers } from "./Resolvers/UserResolver.js";

// Parsing the env file.
dotenv.config({ path: path.resolve(".env") });
const { PORT, MONGO_URI } = process.env;

const typeDefs = gql`
  type Query {
    users: [Users]
  }
  type Users {
    _id: ID!
    name: String!
    email: String
    password: String
  }
`;

const resolvers = {
  Query: {
    users: getAllUsers,
  },
};

const app = express();
const httpServer = createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
server.applyMiddleware({ app });

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen({ port: PORT }, () => {
      console.log(
        `Mongo+GraphQL running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })
  .catch((err) => console.error("Error while connecting to MongoDB:\n" + err));
