import { config } from "dotenv";
config();

// Typegoose logging TODO: disable before prod
import { setLogLevel } from "@typegoose/typegoose";
setLogLevel("DEBUG");

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import cors from "cors";
import express from "express";
import http from "http";

import { connect } from "mongoose";

import schemaBuild from "./resolvers";
import path from "path";

async function startApolloServer() {
  const corsAllowedOrigins: Array<string | RegExp> = [
    /localhost/,
    /192\.168\.1\.5:3000/,
    /192\.168\.1\.5:4000/,
    "https://studio.apollographql.com",
  ];

  const corsOptions: cors.CorsOptions = {
    origin: corsAllowedOrigins,
  };

  // Required logic for integrating with Express
  const app = express();

  app.use(cors(corsOptions));

  // Serve static files from client
  app.use(express.static(path.join(__dirname, "../../client/build")));

  const httpServer = http.createServer(app);

  const MONGODB_URI = process.env.MONGODB_URI;

  // create mongoose connection
  if (MONGODB_URI) {
    try {
      const mongoose = await connect(MONGODB_URI);
      console.log("Connected to MongoDB");
      mongoose.set("debug", true);
      mongoose.connection;
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
      } else {
        console.log("Something went wrong with MongoDB");
      }
    }
  } else {
    console.log("MongoDB URI is undefined");
  }

  const schema = await schemaBuild();
  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
    cors: false,
  });

  const PORT = process.env.PORT || 4000;
  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((error) => console.log(`Error: ${error}`));
