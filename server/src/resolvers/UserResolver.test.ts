import connectToDB from "../utils/connectToDB";
import { callQuery, createDefaultSpace, resetDB } from "../test-utils";

import { mongoose } from "@typegoose/typegoose";
import { exampleUsers } from "../test-utils/testHelpers";
import { Space } from "src/entities/Space";

let space: Space;
let dbConnection: mongoose.Connection | void;

beforeAll(async () => {
  dbConnection = await connectToDB();
});

beforeEach(async () => {
  await resetDB();
  space = await createDefaultSpace();
});

afterAll(() => {
  dbConnection?.close();
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
    const variableValues = exampleUsers[0];
    const response = await callQuery({
      source: createUser,
      variableValues,
    });
    const user = exampleUsers[0].data;
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
    const variableValues = exampleUsers[0];
    const response = await callQuery({
      source: createUser,
      variableValues,
      contextValue: {
        space: space.id,
      },
    });
    const user = exampleUsers[0].data;
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
    await callQuery({
      source: createUser,
      variableValues: exampleUsers[0],
      contextValue: {
        space: space.id,
      },
    });
    const response = await callQuery({
      source: createUser,
      variableValues: exampleUsers[0],
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
    const createResponse = await callQuery({
      source: createUser,
      variableValues: exampleUsers[0],
    });

    const updateValues = {
      id: createResponse.data?.createUser.id,
      data: {
        first_name: "Newname",
      },
    };
    const updateResponse = await callQuery({
      source: updateUser,
      variableValues: updateValues,
    });

    expect(updateResponse).toMatchObject({
      data: { updateUser: { ...updateValues.data } },
    });

    expect(updateResponse).not.toEqual(createResponse);
  });

  test("updateUser returns an error if no user exists with given ID", async () => {
    await callQuery({
      source: createUser,
      variableValues: exampleUsers[0],
    });

    const updateValues = {
      id: "61c7f4ffedaa15c81ffd55c9",
      data: {
        first_name: "Failed test",
      },
    };
    const updateResponse = await callQuery({
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
    let users: any[] = [];
    // Create three users
    const userResponses = exampleUsers.map((user) =>
      callQuery({
        source: createUser,
        variableValues: user,
      })
        .then((response) => users.push(response.data?.createUser))
        .catch((e) => console.log(e))
    );
    await Promise.all(userResponses);

    const deleteResponse = await callQuery({
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
