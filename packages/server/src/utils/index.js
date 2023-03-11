"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.getHashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getHashedPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt_1.default.hash(password, saltRounds);
};
exports.getHashedPassword = getHashedPassword;
const decodeToken = (token) => {
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
        throw new Error("JWT secret missing from env.");
    }
    return jsonwebtoken_1.default.verify(token, SECRET);
};
exports.decodeToken = decodeToken;
