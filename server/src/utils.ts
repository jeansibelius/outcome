import { config } from "dotenv";
config();

import { mongoose } from "@typegoose/typegoose";
import { connect } from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DecodedJwtToken } from "./types";

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

export const getHashedPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const decodeToken = (token: string): DecodedJwtToken => {
  const SECRET = process.env.JWT_SECRET as jwt.Secret;
  if (!SECRET) {
    throw new Error("JWT secret missing from env.");
  }

  let decodedTokenUser = undefined;

  jwt.verify(token, SECRET, (error, decoded): jwt.JwtPayload => {
    if (error) {
      console.log("jwt error", error);
      throw new Error(error.toString());
    }
    if (decoded) {
      return (decodedTokenUser = decoded);
    }
    throw new Error("Something went wrong with jwt.verify");
  });

  if (!token || !decodedTokenUser) {
    throw new Error("Token missing or invalid.");
  }
  return decodedTokenUser;
};
