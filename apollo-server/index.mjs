import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import CombinedTypes from "./TypeDefs/index.js";
import CombinedResolvers from "./Resolvers/index.js";
import ErrHandler from "./ErrHandler.js";

// Parsing the env file.
dotenv.config({ path: path.resolve("../.env") });
const { PORT, MONGO_URI } = process.env;

const app = express();
const httpServer = createServer(app);
const server = new ApolloServer({
  typeDefs: CombinedTypes,
  resolvers: CombinedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  debug: false,
  formatError: ErrHandler,
});
await server.start();

const corsOptions = {
  origin: "https://studio.apollographql.com",
  credentials: true,
};

server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: PORT }, () => {
  return mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(
        `Mongo+GraphQL running at http://localhost:${PORT}${server.graphqlPath}`
      );
    })
    .catch((err) =>
      console.error("Error while connecting to MongoDB:\n" + err)
    );
});
