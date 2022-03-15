import { mongoose } from "@typegoose/typegoose";
import { login } from "../../../client/src/queries";
import { callQuery, createDefaultUser, resetDB } from "../test-utils";
import { exampleUser } from "../test-utils/testHelpers";
import connectToDB from "./connectToDB";
import { decodeToken } from "./";

describe("When decoding a token", () => {
  let dbConnection: mongoose.Connection | void;

  beforeAll(async () => {
    dbConnection = await connectToDB();
  });

  afterAll(() => {
    dbConnection?.close();
    console.log("closed db connection");
  });

  test("an error is thrown, if the JWT secret is missing from env vars", () => {
    const OLD_ENV = process.env;
    process.env = { ...OLD_ENV };

    const token = "anyrandomstring";
    process.env.JWT_SECRET = undefined;
    expect(() => decodeToken(token)).toThrowError("JWT secret missing from env.");
    process.env = OLD_ENV;
  });

  test("an error is thrown, if the token is incorrect", () => {
    const token = "anyrandomstring";
    expect(() => decodeToken(token)).toThrowError("jwt malformed");
  });

  test("an error is thrown, if the token is missing", () => {
    const token = "";
    expect(() => decodeToken(token)).toThrowError("jwt must be provided");
  });

  test("the user id, expiration and issued at are correctly returned", async () => {
    await resetDB();
    const user = await createDefaultUser();
    const response = await callQuery({
      source: login,
      variableValues: {
        email: exampleUser.email,
        password: exampleUser.password,
      },
    });
    const issuedAt = Math.floor(Date.now() / 1000); // JWT timestamp precision
    const token = response.data?.login.token;
    const decodedTokenUser = decodeToken(token);
    expect(decodedTokenUser.exp).toEqual(issuedAt + 60 * 60 * 24); // Expriy in 24h from issuance
    expect(decodedTokenUser.iat).toEqual(issuedAt);
    expect(decodedTokenUser.id).toEqual(user.id);
  });
});
