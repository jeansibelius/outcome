import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DecodedTokenUser } from "./types";

export const getHashedPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const getUserFromToken = (token: string): DecodedTokenUser => {
  const SECRET = process.env.JWT_SECRET as jwt.Secret;
  if (!SECRET) {
    throw new Error("JWT secret missing from env.");
  }

  let decodedTokenUser = undefined;

  jwt.verify(token, SECRET, (error, decoded): DecodedTokenUser => {
    if (error) {
      console.log("jwt error", error);
      throw new Error(error.toString());
    }
    return (decodedTokenUser = decoded as DecodedTokenUser);
  });

  if (!token || !decodedTokenUser) {
    throw new Error("Token missing or invalid.");
  }
  return decodedTokenUser;
};
