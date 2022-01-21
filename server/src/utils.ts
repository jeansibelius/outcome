import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DecodedJwtToken } from "./types";

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
