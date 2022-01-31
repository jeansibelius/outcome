import { config } from "dotenv";
config();

// Typegoose logging TODO: disable before prod
//import { setLogLevel } from "@typegoose/typegoose";
//setLogLevel("DEBUG");

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, AuthenticationError } from "apollo-server-core";
import cors from "cors";
import express from "express";
import http from "http";

import { connect } from "mongoose";

import schemaBuild from "./resolvers";
import path from "path";
import { RequestCustom, spaceExtractor, tokenExtractor } from "./middleware";
import { decodeToken } from "./utils";
import { ContextType, DecodedJwtToken } from "./types";

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
  const appPath = "/graphql";

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

  // Extract token and add to request, if found
  app.use(tokenExtractor);
  // Extract space id and add to request, if found
  app.use(spaceExtractor);

  const schema = await schemaBuild();
  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: RequestCustom }): ContextType | null => {
      // Exclude login from auth
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (req.body.query.match("Login")) return null;

      const token = req.token;
      const space = req.space;
      console.log("space", space);
      if (!token) {
        throw new Error("Token missing from request.");
      }
      if (!space) {
        throw new Error("User space missing from request.");
      }

      // try to retrieve a user with the token
      const user: DecodedJwtToken = decodeToken(token);
      // we could also check user roles/permissions here
      if (!user) throw new AuthenticationError("You must be logged in");

      // add the user to the context
      return { user, space };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // More required logic for integrating with Express
  await server.start();

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: appPath,
    cors: false,
  });

  const PORT = process.env.PORT || 4000;
  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((error) => console.log(`Error: ${error}`));
