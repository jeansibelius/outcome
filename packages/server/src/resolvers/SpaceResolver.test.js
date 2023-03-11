"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToDB_1 = __importDefault(require("../utils/connectToDB"));
const test_utils_1 = require("../test-utils");
const queries_1 = require("@packages/client/src/queries");
const testHelpers_1 = require("../test-utils/testHelpers");
let userID;
let dbConnection;
beforeAll(async () => {
    dbConnection = await (0, connectToDB_1.default)();
});
beforeEach(async () => {
    await (0, test_utils_1.resetDB)();
    const user = await (0, test_utils_1.createDefaultUser)();
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
${queries_1.spaceDetails}
`;
const updateSpace = `
mutation UpdateSpace($data: SpaceUpdateInput!, $id: String!) {
  updateSpace(data: $data, id: $id) {
    ...spaceDetails
  }
}
${queries_1.spaceDetails}
`;
const addUserToSpace = `
mutation AddUserToSpace($userId: String!, $spaceId: String!) {
  addUserToSpace(userId: $userId, id: $spaceId) {
    ...spaceDetails
  }
}
${queries_1.spaceDetails}
`;
const deleteUserFromSpace = `
mutation DeleteUserFromSpace($userId: String!, $spaceId: String!) {
  deleteUserFromSpace(userId: $userId, id: $spaceId) {
    ...spaceDetails
  }
}
${queries_1.spaceDetails}
`;
const deleteSpace = `
mutation DeleteSpace($deleteSpaceId: String!) {
  deleteSpace(id: $deleteSpaceId)
}
`;
describe("When resolving spaces", () => {
    test("createSpace returns a new space with correct details", async () => {
        const variableValues = testHelpers_1.exampleSpaces[0];
        const response = await (0, test_utils_1.callQuery)({
            source: queries_1.createSpace,
            variableValues,
        });
        expect(response).toMatchObject({
            data: { createSpace: { ...variableValues.data } },
        });
    });
    test("returnAllSpaces returns all existing spaces", async () => {
        const spaces = [];
        const spaceResponses = testHelpers_1.exampleSpaces.map((space) => (0, test_utils_1.callQuery)({
            source: queries_1.createSpace,
            variableValues: space,
        })
            .then((response) => spaces.push(response.data?.createSpace))
            .catch((e) => console.log(e)));
        await Promise.all(spaceResponses);
        const response = await (0, test_utils_1.callQuery)({
            source: returnAllSpaces,
        });
        spaces.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
        const allSpaces = response.data?.returnAllSpaces;
        allSpaces.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
        expect(allSpaces).toEqual(spaces);
    });
    test("updateSpace returns the correct space with new details", async () => {
        const createResponse = await (0, test_utils_1.callQuery)({
            source: queries_1.createSpace,
            variableValues: testHelpers_1.exampleSpaces[0],
        });
        const updateValues = {
            id: createResponse.data?.createSpace.id,
            data: {
                name: "New space name",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: updateSpace,
            variableValues: updateValues,
        });
        expect(updateResponse).toMatchObject({
            data: { updateSpace: { ...updateValues.data } },
        });
    });
    test("updateSpace returns an error if no space exists with given ID", async () => {
        await (0, test_utils_1.callQuery)({
            source: queries_1.createSpace,
            variableValues: testHelpers_1.exampleSpaces[0],
        });
        const updateValues = {
            id: "61c7f4ffedaa15c81ffd55c9",
            data: {
                name: "Failed test",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
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
        let space;
        beforeEach(async () => {
            const newSpace = await (0, test_utils_1.callQuery)({
                source: queries_1.createSpace,
                variableValues: testHelpers_1.exampleSpaces[0],
            });
            space = newSpace.data?.createSpace;
        });
        test("returns an error, if the space id is incorrect", async () => {
            const updateValues = {
                spaceId: "61ed32462126f9bc47f96251",
                userId: userID,
            };
            const updateResponse = await (0, test_utils_1.callQuery)({
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
            const updateResponse = await (0, test_utils_1.callQuery)({
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
            const updateResponse = await (0, test_utils_1.callQuery)({
                source: addUserToSpace,
                variableValues: updateValues,
            });
            expect(updateResponse).toMatchObject({
                data: {
                    addUserToSpace: {
                        ...space,
                        users: [
                            {
                                first_name: testHelpers_1.exampleUser.first_name,
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
            const updateResponse = await (0, test_utils_1.callQuery)({
                source: addUserToSpace,
                variableValues: updateValues,
            });
            const secondUpdateResponse = await (0, test_utils_1.callQuery)({
                source: addUserToSpace,
                variableValues: updateValues,
            });
            expect(updateResponse).toMatchObject(secondUpdateResponse);
        });
    });
    describe("deleteUserFromSpace", () => {
        let space;
        beforeEach(async () => {
            const newSpace = await (0, test_utils_1.callQuery)({
                source: queries_1.createSpace,
                variableValues: testHelpers_1.exampleSpaces[0],
            });
            space = newSpace.data?.createSpace;
        });
        test("returns an error, if the space id is incorrect", async () => {
            const updateValues = {
                spaceId: "61ed32462126f9bc47f96251",
                userId: userID,
            };
            const updateResponse = await (0, test_utils_1.callQuery)({
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
            const updateResponse = await (0, test_utils_1.callQuery)({
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
            await (0, test_utils_1.callQuery)({
                source: addUserToSpace,
                variableValues: updateValues,
            });
            const deleteResponse = await (0, test_utils_1.callQuery)({
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
            const deleteResponse = await (0, test_utils_1.callQuery)({
                source: deleteUserFromSpace,
                variableValues: updateValues,
            });
            expect(deleteResponse).toMatchObject({
                data: { deleteUserFromSpace: { ...space } },
            });
        });
    });
    test("deleteSpace returns true when called with a space ID and", async () => {
        const spaces = [];
        // Create three spaces
        const spaceResponses = testHelpers_1.exampleSpaces.map((space) => (0, test_utils_1.callQuery)({
            source: queries_1.createSpace,
            variableValues: space,
        })
            .then((response) => spaces.push(response.data?.createSpace))
            .catch((e) => console.log(e)));
        await Promise.all(spaceResponses);
        const deleteResponse = await (0, test_utils_1.callQuery)({
            source: deleteSpace,
            variableValues: {
                deleteSpaceId: spaces[0].id,
            },
        });
        expect(deleteResponse).toMatchObject({
            data: { deleteSpace: true },
        });
        // Check that all spaces returns exactly two items after deletion
        const response = await (0, test_utils_1.callQuery)({
            source: returnAllSpaces,
        });
        expect(response.data?.returnAllSpaces).toHaveLength(2);
    });
});
