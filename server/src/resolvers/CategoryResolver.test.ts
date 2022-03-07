import { connectToDB } from "../utils";
import { callQuery } from "../test-utils";

import { createCategory, createSpace, returnAllCategories } from "../../../client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { Space } from "../entities/Space";
import { CategoryModel, SpaceModel } from "../entities/index";
import { exampleCategories } from "../test-utils/testHelpers";
import { Category } from "src/entities/Category";

let space: Space;
let dbConnection: mongoose.Connection | void;

beforeAll(async () => {
  dbConnection = await connectToDB();
});

beforeEach(async () => {
  const deletedSpaces = await SpaceModel.deleteMany({});
  console.log(`deleted ${deletedSpaces.deletedCount} space(s)`);

  const deletedCategories = await CategoryModel.deleteMany({});
  console.log(`deleted ${deletedCategories.deletedCount} categories`);

  const spaceResponse = await callQuery({
    source: createSpace,
    variableValues: {
      data: {
        name: "Test Space",
      },
    },
  });
  space = spaceResponse.data?.createSpace.id;
  console.log("created space", space);
});

afterAll(() => {
  dbConnection?.close();
  console.log("closed db connection");
});

describe("When resolving categories", () => {
  let categories: any[] = [];
  beforeEach(async () => {
    const categoryResponses = exampleCategories.map((category) =>
      callQuery({
        source: createCategory,
        variableValues: category,
        contextValue: {
          space,
        },
      })
        .then((response) => categories.push(response.data?.createCategory))
        .catch((e) => console.log(e))
    );
    await Promise.all(categoryResponses);
  });

  test("returnAllCategories returns all existing categories", async () => {
    const response = await callQuery({
      source: returnAllCategories,
      contextValue: {
        space,
      },
    });
    categories.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
    const allCategories = response.data?.returnAllCategories.sort(
      (cat1: Category, cat2: Category) => cat1.name.localeCompare(cat2.name)
    );
    expect(allCategories).toEqual(categories);
  });
});
