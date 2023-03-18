import { Request, Response, NextFunction } from "express";

export interface RequestCustom extends Request {
  token?: string;
  space?: string;
}

export const tokenExtractor = (request: RequestCustom, _response: Response, next: NextFunction) => {
  request.token = undefined;
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.split(" ")[1];
  }
  next();
};

export const spaceExtractor = (request: RequestCustom, _response: Response, next: NextFunction) => {
  request.space = undefined;
  const activeSpace = request.get("space");
  if (activeSpace) {
    request.space = activeSpace;
  }
  next();
};
