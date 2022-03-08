import { connectToDB } from "../utils";
import { callQuery } from "../test-utils";

import {
  createCategory,
  createSpace,
  deleteCategory,
  returnAllCategories,
  updateCategory,
} from "../../../client/src/queries";
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
  test("createCategory returns a new category with correct details", async () => {
    const variableValues = {
      categoryData: {
        type: "Expense",
        name: "Expense test",
        monthlyBudget: 1234,
        description: "Expense test",
        icon: "random",
      },
    };
    const response = await callQuery({
      source: createCategory,
      variableValues,
      contextValue: {
        space,
      },
    });
    expect(response).toMatchObject({
      data: { createCategory: { ...variableValues.categoryData } },
    });
  });

  test("returnAllCategories returns all existing categories", async () => {
    let categories: any[] = [];
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

  test("updateCategory returns the correct category with new details", async () => {
    const createResponse = await callQuery({
      source: createCategory,
      variableValues: exampleCategories[0],
      contextValue: {
        space,
      },
    });

    const updateValues = {
      id: createResponse.data?.createCategory.id,
      data: {
        type: "Expense",
        name: "Expense test",
        monthlyBudget: 1234,
        description: "Expense test",
        icon: "random",
      },
    };
    const updateResponse = await callQuery({
      source: updateCategory,
      variableValues: updateValues,
      contextValue: {
        space,
      },
    });

    expect(updateResponse).toMatchObject({
      data: { updateCategory: { ...updateValues.data } },
    });
  });

  test("updateCategory returns an error if no category exists with given ID", async () => {
    await callQuery({
      source: createCategory,
      variableValues: exampleCategories[0],
      contextValue: {
        space,
      },
    });

    const updateValues = {
      id: "61c7f4ffedaa15c81ffd55c9",
      data: {
        type: "Expense",
        name: "Expense test",
        monthlyBudget: 1234,
        description: "Expense test",
        icon: "random",
      },
    };
    const updateResponse = await callQuery({
      source: updateCategory,
      variableValues: updateValues,
      contextValue: {
        space,
      },
    });

    expect(updateResponse).toMatchObject({
      data: null,
      errors: [
        {
          message: "Invalid category id",
        },
      ],
    });
  });

  test("deleteCategory returns true when called with a category ID and", async () => {
    const createResponse = await callQuery({
      source: createCategory,
      variableValues: exampleCategories[0],
      contextValue: {
        space,
      },
    });

    const deleteResponse = await callQuery({
      source: deleteCategory,
      variableValues: {
        id: createResponse.data?.createCategory.id,
      },
      contextValue: {
        space,
      },
    });

    expect(deleteResponse).toMatchObject({
      data: { deleteCategory: true },
    });
  });
});
