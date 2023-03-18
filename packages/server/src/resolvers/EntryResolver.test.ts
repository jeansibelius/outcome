import connectToDB from "../utils/connectToDB";
import { callQuery, createDefaultUserAndSpace, resetDB } from "../test-utils";

import {
  createEntry,
  deleteEntry,
  returnAllEntries,
  updateEntry,
} from "../../../client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { exampleEntries } from "../test-utils/testHelpers";
import { Entry } from "src/entities/Entry";

let user: { id: string };
let space: string;
let dbConnection: mongoose.Connection | void;
const CreateEntry = createEntry as string;

beforeAll(async () => {
  dbConnection = await connectToDB();
});

beforeEach(async () => {
  await resetDB();
  const { defaultUser, defaultSpaceID } = await createDefaultUserAndSpace();
  user = defaultUser;
  space = defaultSpaceID;
});

afterAll(async () => {
  await dbConnection?.close();
  console.log("closed db connection");
});

describe("When resolving entries", () => {
  test("createEntry returns a new entry with correct details", async () => {
    const response = await callQuery({
      source: CreateEntry,
      variableValues: exampleEntries[0],
      contextValue: {
        user,
        space,
      },
    });
    expect(response.errors).toBeUndefined();
    expect(response).toMatchObject({
      data: { createEntry: { ...exampleEntries[0].entryData } },
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
    const response = await callQuery({
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
    const entries: Entry[] = [];
    const entryResponses = exampleEntries.map((entry) =>
      callQuery({
        source: CreateEntry,
        variableValues: entry,
        contextValue: {
          user,
          space,
        },
      })
        .then((response) => entries.push(response.data?.createEntry as Entry))
        .catch((e) => console.log(e))
    );
    await Promise.all(entryResponses);

    const response = await callQuery({
      source: returnAllEntries as string,
      contextValue: {
        user,
        space,
      },
    });
    entries.sort((obj1, obj2) => obj1.name.localeCompare(obj2.name));
    const allEntries = response.data?.returnAllEntries as Entry[];
    allEntries.sort((obj1: Entry, obj2: Entry) =>
      obj1.name.localeCompare(obj2.name)
    );
    expect(allEntries).toEqual(entries);
  });

  test("updateEntry returns the correct entry with new details", async () => {
    const createResponse = await callQuery({
      source: CreateEntry,
      variableValues: exampleEntries[0],
      contextValue: {
        user,
        space,
      },
    });

    const updateValues = {
      id: createResponse.data?.createEntry.id as string,
      data: {
        type: "Income",
        date: "2021-12-09T00:00:00.000Z",
        name: "Income 3",
        amount: 999999999999,
        description: "Edited description",
      },
    };
    const updateResponse = await callQuery({
      source: updateEntry as string,
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
    await callQuery({
      source: CreateEntry,
      variableValues: exampleEntries[0],
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
    const updateResponse = await callQuery({
      source: updateEntry as string,
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
    const createResponse = await callQuery({
      source: CreateEntry,
      variableValues: exampleEntries[0],
      contextValue: {
        user,
        space,
      },
    });

    const deleteResponse = await callQuery({
      source: deleteEntry as string,
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
