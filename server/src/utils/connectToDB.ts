import { config } from "dotenv";
config();

import { mongoose } from "@typegoose/typegoose";
import { connect } from "mongoose";

const connectToDB = async (): Promise<mongoose.Connection | void> => {
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
      if (process.env.NODE_ENV === "development") {
        mongoose.set("debug", true);
      }
      return mongoose.connection;
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
      }
    }
  } else {
    console.error("MongoDB URI is undefined");
  }
};

export default connectToDB;
