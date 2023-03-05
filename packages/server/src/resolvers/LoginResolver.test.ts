import connectToDB from "../utils/connectToDB";
import { callQuery, createDefaultUserAndSpace, resetDB } from "../test-utils";

import { login } from "@packages/client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { exampleUser } from "../test-utils/testHelpers";

let dbConnection: mongoose.Connection | void;
const Login = login as string;

beforeAll(async () => {
  dbConnection = await connectToDB();
});

beforeEach(async () => {
  await resetDB();
  await createDefaultUserAndSpace();
});

afterAll(async () => {
  await dbConnection?.close();
  console.log("closed db connection");
});

describe("When resolving login", () => {
  test("the login mutation returns a token and user with correct details", async () => {
    const response = await callQuery({
      source: Login,
      variableValues: {
        email: exampleUser.email,
        password: exampleUser.password,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response.data?.login.token).toBeDefined();
    expect(response).toMatchObject({
      data: {
        login: {
          user: {
            first_name: exampleUser.first_name,
            last_name: exampleUser.last_name,
            spaces: [
              {
                name: "Test Space",
              },
            ],
          },
        },
      },
    });
  });

  test("the mutation returns an error, when email or password is wrong", async () => {
    const response = await callQuery({
      source: Login,
      variableValues: {
        email: exampleUser.email,
        password: "wrongpswd",
      },
    });
    expect(JSON.stringify(response.errors)).toContain(
      "Wrong email or password."
    );
  });

  test("the mutation returns the default error even, when user doesn't exist", async () => {
    const response = await callQuery({
      source: Login,
      variableValues: {
        email: "nosuchuser@test.com",
        password: exampleUser.password,
      },
    });
    expect(JSON.stringify(response.errors)).toContain(
      "Wrong email or password."
    );
  });
});
