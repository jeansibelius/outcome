import { Request, Response, NextFunction } from "express";

export interface RequestCustom extends Request {
  token?: string;
}

export const tokenExtractor = (request: RequestCustom, _response: Response, next: NextFunction) => {
  request.token = undefined;
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.split(" ")[1];
  }
  console.log("middleware token", request.token);
  next();
};
