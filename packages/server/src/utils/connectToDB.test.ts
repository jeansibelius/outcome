import { mongoose } from "@typegoose/typegoose";
import connectToDB from "./connectToDB";

describe("When connecting to the DB", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  // TODO: find a way to test with different NODE_ENV values, even though it's a read only property (tsc build fails with below style)
  describe.skip("the correct URI is used", () => {
    test("when NODE_ENV is set to test", async () => {
      const envToTest = "test";
      console.log("env", process.env.NODE_ENV);
      //process.env.NODE_ENV = envToTest;
      const connection: mongoose.Connection | void = await connectToDB();
      await connection?.close();
      expect(connection?.name).toEqual(envToTest);
    });

    test("when NODE_ENV is not set", async () => {
      //const envToTest = undefined;
      //process.env.NODE_ENV = envToTest;
      const connection: mongoose.Connection | void = await connectToDB();
      await connection?.close();
      expect(connection?.name).toEqual("test");
    });
  });

  test("connection error is caught and logged to console, if MongoDB URI is invalid", async () => {
    //const envToTest = undefined;
    //process.env.NODE_ENV = envToTest;
    process.env.MONGODB_URI_TEST = "invalidUriToThrowError";

    const consoleErrorSpy = jest.spyOn(console, "error");

    const connection: mongoose.Connection | void = await connectToDB();
    await connection?.close();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error connecting to MongoDB: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"'
    );
  });

  test("an error is logged to console, if MongoDB URI is undefined", async () => {
    //const envToTest = undefined;
    //process.env.NODE_ENV = envToTest;
    process.env.MONGODB_URI_TEST = undefined;

    const consoleErrorSpy = jest.spyOn(console, "error");

    const connection: mongoose.Connection | void = await connectToDB();
    await connection?.close();

    expect(consoleErrorSpy).toHaveBeenCalledWith("MongoDB URI is undefined");
  });
});
