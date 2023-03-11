"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("@packages/client/src/queries");
const test_utils_1 = require("../test-utils");
const testHelpers_1 = require("../test-utils/testHelpers");
const connectToDB_1 = __importDefault(require("./connectToDB"));
const _1 = require("./");
describe("When decoding a token", () => {
    let dbConnection;
    beforeAll(async () => {
        dbConnection = await (0, connectToDB_1.default)();
    });
    afterAll(async () => {
        await dbConnection?.close();
        console.log("closed db connection");
    });
    test("an error is thrown, if the JWT secret is missing from env vars", () => {
        const OLD_ENV = process.env;
        process.env = { ...OLD_ENV };
        const token = "anyrandomstring";
        process.env.JWT_SECRET = undefined;
        expect(() => (0, _1.decodeToken)(token)).toThrowError("JWT secret missing from env.");
        process.env = OLD_ENV;
    });
    test("an error is thrown, if the token is incorrect", () => {
        const token = "anyrandomstring";
        expect(() => (0, _1.decodeToken)(token)).toThrowError("jwt malformed");
    });
    test("an error is thrown, if the token is missing", () => {
        const token = "";
        expect(() => (0, _1.decodeToken)(token)).toThrowError("jwt must be provided");
    });
    test("the user id, expiration and issued at are correctly returned", async () => {
        await (0, test_utils_1.resetDB)();
        const user = await (0, test_utils_1.createDefaultUser)();
        const response = await (0, test_utils_1.callQuery)({
            source: queries_1.login,
            variableValues: {
                email: testHelpers_1.exampleUser.email,
                password: testHelpers_1.exampleUser.password,
            },
        });
        const issuedAt = Math.floor(Date.now() / 1000); // JWT timestamp precision
        const token = response.data?.login.token;
        const decodedTokenUser = (0, _1.decodeToken)(token);
        expect(decodedTokenUser.exp).toEqual(issuedAt + 60 * 60 * 24); // Expriy in 24h from issuance
        expect(decodedTokenUser.iat).toEqual(issuedAt);
        expect(decodedTokenUser.id).toEqual(user.id);
    });
});
