import { mongoose } from "@typegoose/typegoose";
import connectToDB from "./connectToDB";

describe("When connecting to the DB", () => {
  describe("the correct URI is used", () => {
    test("when NODE_ENV is set to test", async () => {
      const envToTest = "test";
      const OLD_ENV = process.env;
      process.env = { ...OLD_ENV };
      process.env.NODE_ENV = envToTest;
      const connection: mongoose.Connection | void = await connectToDB();
      await connection?.close();
      expect(connection?.name).toEqual(envToTest);
      process.env = OLD_ENV;
    });

    test("when NODE_ENV is not set", async () => {
      const envToTest = undefined;
      const OLD_ENV = process.env;
      process.env = { ...OLD_ENV };
      process.env.NODE_ENV = envToTest;
      const connection: mongoose.Connection | void = await connectToDB();
      await connection?.close();
      expect(connection?.name).toEqual("test");
      process.env = OLD_ENV;
    });
  });

  test("connection error is caught and logged to console, if MongoDB URI is invalid", async () => {
    const envToTest = undefined;
    const OLD_ENV = process.env;
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = envToTest;
    process.env.MONGODB_URI_TEST = "invalidUriToThrowError";

    const consoleErrorSpy = jest.spyOn(console, "error");

    const connection: mongoose.Connection | void = await connectToDB();
    await connection?.close();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error connecting to MongoDB: Invalid connection string "invalidUriToThrowError"'
    );
    process.env = OLD_ENV;
  });

  test("an error is logged to console, if MongoDB URI is undefined", async () => {
    const envToTest = undefined;
    const OLD_ENV = process.env;
    process.env = { ...OLD_ENV };
    process.env.NODE_ENV = envToTest;
    process.env.MONGODB_URI_TEST = undefined;

    const consoleErrorSpy = jest.spyOn(console, "error");

    const connection: mongoose.Connection | void = await connectToDB();
    await connection?.close();

    expect(consoleErrorSpy).toHaveBeenCalledWith("MongoDB URI is undefined");
    process.env = OLD_ENV;
  });
});
