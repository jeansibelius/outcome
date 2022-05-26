import connectToDB from "../utils/connectToDB";
import { callQuery, createDefaultUser, resetDB } from "../test-utils";

import { createSpace, spaceDetails } from "../../../client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { exampleSpaces, exampleUser } from "../test-utils/testHelpers";
import { Space } from "src/entities/Space";
import { User } from "src/entities/User";

let userID: string;
let dbConnection: mongoose.Connection | void;

beforeAll(async () => {
  dbConnection = await connectToDB();
});

beforeEach(async () => {
  await resetDB();
  const user: User = await createDefaultUser();
  userID = String(user.id);
});

afterAll(async () => {
  await dbConnection?.close();
  console.log("closed db connection");
});

const returnAllSpaces = `
query ReturnAllSpaces {
  returnAllSpaces {
    ...spaceDetails
  }
}
${spaceDetails}
`;

const updateSpace = `
mutation UpdateSpace($data: SpaceUpdateInput!, $id: String!) {
  updateSpace(data: $data, id: $id) {
    ...spaceDetails
  }
}
${spaceDetails}
`;

const addUserToSpace = `
mutation AddUserToSpace($userId: String!, $spaceId: String!) {
  addUserToSpace(userId: $userId, id: $spaceId) {
    ...spaceDetails
  }
}
${spaceDetails}
`;

const deleteUserFromSpace = `
mutation DeleteUserFromSpace($userId: String!, $spaceId: String!) {
  deleteUserFromSpace(userId: $userId, id: $spaceId) {
    ...spaceDetails
  }
}
${spaceDetails}
`;

const deleteSpace = `
mutation DeleteSpace($deleteSpaceId: String!) {
  deleteSpace(id: $deleteSpaceId)
}
`;

describe("When resolving spaces", () => {
  test("createSpace returns a new space with correct details", async () => {
    const variableValues = exampleSpaces[0];
    const response = await callQuery({
      source: createSpace as string,
      variableValues,
    });
    expect(response).toMatchObject({
      data: { createSpace: { ...variableValues.data } },
    });
  });

  test("returnAllSpaces returns all existing spaces", async () => {
    const spaces: Space[] = [];
    const spaceResponses = exampleSpaces.map((space) =>
      callQuery({
        source: createSpace as string,
        variableValues: space,
      })
        .then((response) => spaces.push(response.data?.createSpace as Space))
        .catch((e) => console.log(e))
    );
    await Promise.all(spaceResponses);

    const response = await callQuery({
      source: returnAllSpaces,
    });
    spaces.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
    const allSpaces: Space[] = response.data?.returnAllSpaces as Space[];
    allSpaces.sort((cat1: Space, cat2: Space) =>
      cat1.name.localeCompare(cat2.name)
    );
    expect(allSpaces).toEqual(spaces);
  });

  test("updateSpace returns the correct space with new details", async () => {
    const createResponse = await callQuery({
      source: createSpace as string,
      variableValues: exampleSpaces[0],
    });

    const updateValues = {
      id: createResponse.data?.createSpace.id as string,
      data: {
        name: "New space name",
      },
    };
    const updateResponse = await callQuery({
      source: updateSpace,
      variableValues: updateValues,
    });

    expect(updateResponse).toMatchObject({
      data: { updateSpace: { ...updateValues.data } },
    });
  });

  test("updateSpace returns an error if no space exists with given ID", async () => {
    await callQuery({
      source: createSpace as string,
      variableValues: exampleSpaces[0],
    });

    const updateValues = {
      id: "61c7f4ffedaa15c81ffd55c9",
      data: {
        name: "Failed test",
      },
    };
    const updateResponse = await callQuery({
      source: updateSpace,
      variableValues: updateValues,
    });

    expect(updateResponse).toMatchObject({
      data: null,
      errors: [
        {
          message: "Invalid space id",
        },
      ],
    });
  });

  describe("addUserToSpace", () => {
    let space: Space;
    beforeEach(async () => {
      const newSpace = await callQuery({
        source: createSpace as string,
        variableValues: exampleSpaces[0],
      });
      space = newSpace.data?.createSpace as Space;
    });

    test("returns an error, if the space id is incorrect", async () => {
      const updateValues = {
        spaceId: "61ed32462126f9bc47f96251",
        userId: userID,
      };

      const updateResponse = await callQuery({
        source: addUserToSpace,
        variableValues: updateValues,
      });

      expect(updateResponse).toMatchObject({
        data: null,
        errors: [
          {
            message: "Invalid space id",
          },
        ],
      });
    });

    test("returns an error, if the user id is incorrect", async () => {
      const updateValues = {
        spaceId: space.id,
        userId: "61ed32462126f9bc47f96251",
      };

      const updateResponse = await callQuery({
        source: addUserToSpace,
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

    test("returns the correct space with new details", async () => {
      const updateValues = {
        spaceId: space.id,
        userId: userID,
      };

      const updateResponse = await callQuery({
        source: addUserToSpace,
        variableValues: updateValues,
      });

      expect(updateResponse).toMatchObject({
        data: {
          addUserToSpace: {
            ...space,
            users: [
              {
                first_name: exampleUser.first_name,
                id: userID,
              },
            ],
          },
        },
      });
    });

    test("returns the space unedited if user and space are already linked", async () => {
      const updateValues = {
        spaceId: space.id,
        userId: userID,
      };

      const updateResponse = await callQuery({
        source: addUserToSpace,
        variableValues: updateValues,
      });

      const secondUpdateResponse = await callQuery({
        source: addUserToSpace,
        variableValues: updateValues,
      });

      expect(updateResponse).toMatchObject(secondUpdateResponse);
    });
  });

  describe("deleteUserFromSpace", () => {
    let space: Space;
    beforeEach(async () => {
      const newSpace = await callQuery({
        source: createSpace as string,
        variableValues: exampleSpaces[0],
      });
      space = newSpace.data?.createSpace as Space;
    });

    test("returns an error, if the space id is incorrect", async () => {
      const updateValues = {
        spaceId: "61ed32462126f9bc47f96251",
        userId: userID,
      };

      const updateResponse = await callQuery({
        source: deleteUserFromSpace,
        variableValues: updateValues,
      });

      expect(updateResponse).toMatchObject({
        data: null,
        errors: [
          {
            message: "Invalid space id",
          },
        ],
      });
    });

    test("returns an error, if the user id is incorrect", async () => {
      const updateValues = {
        spaceId: space.id,
        userId: "61ed32462126f9bc47f96251",
      };

      const updateResponse = await callQuery({
        source: deleteUserFromSpace,
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

    test("returns the correct space with new details", async () => {
      const updateValues = {
        spaceId: space.id,
        userId: userID,
      };

      await callQuery({
        source: addUserToSpace,
        variableValues: updateValues,
      });

      const deleteResponse = await callQuery({
        source: deleteUserFromSpace,
        variableValues: updateValues,
      });

      expect(deleteResponse).toMatchObject({
        data: { deleteUserFromSpace: { ...space } },
      });
    });

    test("returns the correct space without edits, if the user and space were not linked to begin with", async () => {
      const updateValues = {
        spaceId: space.id,
        userId: userID,
      };

      const deleteResponse = await callQuery({
        source: deleteUserFromSpace,
        variableValues: updateValues,
      });

      expect(deleteResponse).toMatchObject({
        data: { deleteUserFromSpace: { ...space } },
      });
    });
  });

  test("deleteSpace returns true when called with a space ID and", async () => {
    const spaces: Space[] = [];
    // Create three spaces
    const spaceResponses = exampleSpaces.map((space) =>
      callQuery({
        source: createSpace as string,
        variableValues: space,
      })
        .then((response) => spaces.push(response.data?.createSpace as Space))
        .catch((e) => console.log(e))
    );
    await Promise.all(spaceResponses);

    const deleteResponse = await callQuery({
      source: deleteSpace,
      variableValues: {
        deleteSpaceId: spaces[0].id,
      },
    });

    expect(deleteResponse).toMatchObject({
      data: { deleteSpace: true },
    });

    // Check that all spaces returns exactly two items after deletion
    const response = await callQuery({
      source: returnAllSpaces,
    });

    expect(response.data?.returnAllSpaces).toHaveLength(2);
  });
});
