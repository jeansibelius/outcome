"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToDB_1 = __importDefault(require("../utils/connectToDB"));
const test_utils_1 = require("../test-utils");
const testHelpers_1 = require("../test-utils/testHelpers");
let space;
let dbConnection;
beforeAll(async () => {
    dbConnection = await (0, connectToDB_1.default)();
});
beforeEach(async () => {
    await (0, test_utils_1.resetDB)();
    space = await (0, test_utils_1.createDefaultSpace)();
});
afterAll(async () => {
    await dbConnection?.close();
    console.log("closed db connection");
});
const userDetails = `
fragment userDetails on User {
  id
  first_name
  last_name
  email
  spaces {
    id
    name
  }
}
`;
const createUser = `
mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    ...userDetails
  }
}
${userDetails}
`;
/*
const returnAllUsers = `
query ReturnAllUsers {
  returnAllUsers {
    ...userDetails
  }
}
${userDetails}
`;
*/
const updateUser = `
mutation UpdateUser($data: UserUpdateInput!, $id: String!) {
  updateUser(data: $data, id: $id) {
    ...userDetails
  }
}
${userDetails}
`;
const deleteUser = `
mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId)
}
`;
describe("When resolving users", () => {
    test("createUser returns a new user with correct details and a default space", async () => {
        const variableValues = testHelpers_1.exampleUsers[0];
        const response = await (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues,
        });
        const user = testHelpers_1.exampleUsers[0].data;
        expect(response).toMatchObject({
            data: {
                createUser: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    spaces: [
                        {
                            name: "My Budget",
                        },
                    ],
                },
            },
        });
        expect(response.data?.createUser.password).toBeUndefined();
    });
    test("createUser returns a new user with correct details when context includes a space id", async () => {
        const variableValues = testHelpers_1.exampleUsers[0];
        const response = await (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues,
            contextValue: {
                space: space.id,
            },
        });
        const user = testHelpers_1.exampleUsers[0].data;
        expect(response).toMatchObject({
            data: {
                createUser: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    spaces: [
                        {
                            id: space.id,
                            name: space.name,
                        },
                    ],
                },
            },
        });
    });
    test("createUser returns an error, if user with the same email already exists", async () => {
        await (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues: testHelpers_1.exampleUsers[0],
            contextValue: {
                space: space.id,
            },
        });
        const response = await (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues: testHelpers_1.exampleUsers[0],
            contextValue: {
                space: space.id,
            },
        });
        expect(response).toMatchObject({
            data: null,
            errors: [
                {
                    message: "A user with these details exists.",
                },
            ],
        });
    });
    // eslint-disable-next-line jest/no-commented-out-tests
    /*
    test("returnAllUsers returns all existing users", async () => {
      let users: any[] = [];
      const userResponses = exampleUsers.map((user) =>
        callQuery({
          source: createUser,
          variableValues: user,
        })
          .then((response) => users.push(response.data?.createUser))
          .catch((e) => console.log(e))
      );
      await Promise.all(userResponses);
  
      const response = await callQuery({
        source: returnAllUsers,
      });
      console.log(response);
      users.sort((obj1, obj2) => obj1.first_name.localeCompare(obj2.first_name));
      const allUsers = response.data?.returnAllUsers.sort((obj1: User, obj2: User) =>
        obj1.first_name.localeCompare(obj2.first_name)
      );
      expect(allUsers).toEqual(users);
    });
    */
    test("updateUser returns the correct user with new details", async () => {
        const createResponse = await (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues: testHelpers_1.exampleUsers[0],
        });
        const updateValues = {
            id: createResponse.data?.createUser.id,
            data: {
                first_name: "Newname",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: updateUser,
            variableValues: updateValues,
        });
        expect(updateResponse).toMatchObject({
            data: { updateUser: { ...updateValues.data } },
        });
        expect(updateResponse).not.toEqual(createResponse);
    });
    test("updateUser returns an error if no user exists with given ID", async () => {
        await (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues: testHelpers_1.exampleUsers[0],
        });
        const updateValues = {
            id: "61c7f4ffedaa15c81ffd55c9",
            data: {
                first_name: "Failed test",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: updateUser,
            variableValues: updateValues,
        });
        expect(updateResponse).toMatchObject({
            data: null,
            errors: [
                {
                    message: "Invalid user id",
                },
            ],
        });
    });
    test("deleteUser returns true when called with a user ID and", async () => {
        const users = [];
        // Create three users
        const userResponses = testHelpers_1.exampleUsers.map((user) => (0, test_utils_1.callQuery)({
            source: createUser,
            variableValues: user,
        })
            .then((response) => users.push(response.data?.createUser))
            .catch((e) => console.log(e)));
        await Promise.all(userResponses);
        const deleteResponse = await (0, test_utils_1.callQuery)({
            source: deleteUser,
            variableValues: {
                deleteUserId: users[0].id,
            },
        });
        expect(deleteResponse).toMatchObject({
            data: { deleteUser: 1 },
        });
    });
});
