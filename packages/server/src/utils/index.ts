import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DecodedJwtToken } from "../types";

export const getHashedPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const decodeToken = (token: string): DecodedJwtToken => {
  const SECRET = process.env.JWT_SECRET as jwt.Secret;
  if (!SECRET) {
    throw new Error("JWT secret missing from env.");
  }
  return jwt.verify(token, SECRET) as jwt.JwtPayload;
};
