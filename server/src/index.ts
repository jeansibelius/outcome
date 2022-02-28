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
import { SpaceModel } from "./entities";
import { Space } from "./entities/Space";
import { mongoose } from "@typegoose/typegoose";

export const connectToDB = async (): Promise<mongoose.Connection | void> => {
  let MONGODB_URI;
  switch (process.env.NODE_ENV) {
    case "production":
      MONGODB_URI = process.env.MONGODB_URI_PROD;
      break;
    case "development":
      MONGODB_URI = process.env.MONGODB_URI_DEV;
      break;
    case "demo":
      MONGODB_URI = process.env.MONGODB_URI_DEMO;
      break;
    default:
      MONGODB_URI = process.env.MONGODB_URI_TEST;
  }

  // create mongoose connection
  if (MONGODB_URI) {
    try {
      const mongoose = await connect(MONGODB_URI);
      console.log("Connected to MongoDB", process.env.NODE_ENV);
      mongoose.set("debug", true);
      return mongoose.connection;
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        return console.log(`Error connecting to MongoDB: ${error.message}`);
      } else {
        return console.log("Something went wrong with MongoDB");
      }
    }
  } else {
    return console.log("MongoDB URI is undefined");
  }
};

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

  // Connect to DB
  await connectToDB();

  // Extract token and add to request, if found
  app.use(tokenExtractor);
  // Extract space id and add to request, if found
  app.use(spaceExtractor);

  const schema = await schemaBuild();
  const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: RequestCustom }): Promise<ContextType | null> => {
      // Exclude login from auth
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (req.body.query.match("Login")) return null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (req.body.query.match("CreateUser")) return null;

      const token = req.token;
      const space = req.space;
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

      // Check that user belongs to given space
      const spaceFromDB: Space | null | undefined = await SpaceModel.findById({ _id: space });
      if (!spaceFromDB) {
        throw new AuthenticationError("Given space doesn't exist in the DB.");
      }
      if (!spaceFromDB.users?.includes(new mongoose.Types.ObjectId(user.id))) {
        throw new AuthenticationError("User doesn't belong to the given space.");
      }

      // add the user & active space to the context
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
