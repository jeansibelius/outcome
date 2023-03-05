"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceExtractor = exports.tokenExtractor = void 0;
const tokenExtractor = (request, _response, next) => {
    request.token = undefined;
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.split(" ")[1];
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
const spaceExtractor = (request, _response, next) => {
    request.space = undefined;
    const activeSpace = request.get("space");
    if (activeSpace) {
        request.space = activeSpace;
    }
    next();
};
exports.spaceExtractor = spaceExtractor;
