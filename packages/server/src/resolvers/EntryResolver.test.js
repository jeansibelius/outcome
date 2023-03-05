"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToDB_1 = __importDefault(require("../utils/connectToDB"));
const test_utils_1 = require("../test-utils");
const queries_1 = require("@packages/client/src/queries");
const testHelpers_1 = require("../test-utils/testHelpers");
let user;
let space;
let dbConnection;
const CreateEntry = queries_1.createEntry;
beforeAll(async () => {
    dbConnection = await (0, connectToDB_1.default)();
});
beforeEach(async () => {
    await (0, test_utils_1.resetDB)();
    const { defaultUser, defaultSpaceID } = await (0, test_utils_1.createDefaultUserAndSpace)();
    user = defaultUser;
    space = defaultSpaceID;
});
afterAll(async () => {
    await dbConnection?.close();
    console.log("closed db connection");
});
describe("When resolving entries", () => {
    test("createEntry returns a new entry with correct details", async () => {
        const response = await (0, test_utils_1.callQuery)({
            source: CreateEntry,
            variableValues: testHelpers_1.exampleEntries[0],
            contextValue: {
                user,
                space,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response).toMatchObject({
            data: { createEntry: { ...testHelpers_1.exampleEntries[0].entryData } },
        });
    });
    test("createEntry returns an error, if some required data is missing", async () => {
        const variableValues = {
            entryData: {
                type: "Income",
                date: "2021-12-09T00:00:00.000Z",
                name: "Test",
                // required key amount missing
            },
        };
        const response = await (0, test_utils_1.callQuery)({
            source: CreateEntry,
            variableValues,
            contextValue: {
                user,
                space,
            },
        });
        console.log(response);
        expect(response.errors).toBeDefined();
    });
    test("returnAllEntries returns all existing entries", async () => {
        const entries = [];
        const entryResponses = testHelpers_1.exampleEntries.map((entry) => (0, test_utils_1.callQuery)({
            source: CreateEntry,
            variableValues: entry,
            contextValue: {
                user,
                space,
            },
        })
            .then((response) => entries.push(response.data?.createEntry))
            .catch((e) => console.log(e)));
        await Promise.all(entryResponses);
        const response = await (0, test_utils_1.callQuery)({
            source: queries_1.returnAllEntries,
            contextValue: {
                user,
                space,
            },
        });
        entries.sort((obj1, obj2) => obj1.name.localeCompare(obj2.name));
        const allEntries = response.data?.returnAllEntries;
        allEntries.sort((obj1, obj2) => obj1.name.localeCompare(obj2.name));
        expect(allEntries).toEqual(entries);
    });
    test("updateEntry returns the correct entry with new details", async () => {
        const createResponse = await (0, test_utils_1.callQuery)({
            source: CreateEntry,
            variableValues: testHelpers_1.exampleEntries[0],
            contextValue: {
                user,
                space,
            },
        });
        const updateValues = {
            id: createResponse.data?.createEntry.id,
            data: {
                type: "Income",
                date: "2021-12-09T00:00:00.000Z",
                name: "Income 3",
                amount: 999999999999,
                description: "Edited description",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: queries_1.updateEntry,
            variableValues: updateValues,
            contextValue: {
                user,
                space,
            },
        });
        expect(updateResponse).toMatchObject({
            data: { updateEntry: { ...updateValues.data } },
        });
    });
    test("updateEntry returns an error if no entry exists with given ID", async () => {
        await (0, test_utils_1.callQuery)({
            source: CreateEntry,
            variableValues: testHelpers_1.exampleEntries[0],
            contextValue: {
                user,
                space,
            },
        });
        const updateValues = {
            id: "61c7f4ffedaa15c81ffd55c9",
            data: {
                type: "Income",
                date: "2021-12-09T00:00:00.000Z",
                name: "Income 3",
                amount: 999999999999,
                description: "Edited description",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: queries_1.updateEntry,
            variableValues: updateValues,
            contextValue: {
                user,
                space,
            },
        });
        expect(updateResponse).toMatchObject({
            data: null,
            errors: [
                {
                    message: "Invalid entry id",
                },
            ],
        });
    });
    test("deleteEntry returns true when called with a entry ID and", async () => {
        const createResponse = await (0, test_utils_1.callQuery)({
            source: CreateEntry,
            variableValues: testHelpers_1.exampleEntries[0],
            contextValue: {
                user,
                space,
            },
        });
        const deleteResponse = await (0, test_utils_1.callQuery)({
            source: queries_1.deleteEntry,
            variableValues: {
                id: createResponse.data?.createEntry.id,
            },
            contextValue: {
                user,
                space,
            },
        });
        expect(deleteResponse).toMatchObject({
            data: { deleteEntry: true },
        });
    });
});
