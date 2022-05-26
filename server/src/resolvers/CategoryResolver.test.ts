import connectToDB from "../utils/connectToDB";
import { callQuery, createDefaultSpace, resetDB } from "../test-utils";

import {
  createCategory,
  deleteCategory,
  returnAllCategories,
  updateCategory,
} from "../../../client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { exampleCategories } from "../test-utils/testHelpers";
import { Category } from "src/entities/Category";

let space: string;
let dbConnection: mongoose.Connection | void;

beforeAll(async () => {
  dbConnection = await connectToDB();
});

beforeEach(async () => {
  await resetDB();
  const newSpace = await createDefaultSpace();
  space = newSpace.id as string;
});

const CreateCategory = createCategory as string;
const DeleteCategory = deleteCategory as string;
const ReturnAllCategories = returnAllCategories as string;
const UpdateCategory = updateCategory as string;

afterAll(async () => {
  await dbConnection?.close();
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
      source: CreateCategory,
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
    const categories: Category[] = [];
    const categoryResponses = exampleCategories.map((category) =>
      callQuery({
        source: CreateCategory,
        variableValues: category,
        contextValue: {
          space,
        },
      })
        .then((response) =>
          categories.push(response.data?.createCategory as Category)
        )
        .catch((e) => console.log(e))
    );
    await Promise.all(categoryResponses);

    const response = await callQuery({
      source: ReturnAllCategories,
      contextValue: {
        space,
      },
    });
    categories.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
    const allCategories = response.data?.returnAllCategories as Category[];
    allCategories.sort((cat1: Category, cat2: Category) =>
      cat1.name.localeCompare(cat2.name)
    );
    expect(allCategories).toEqual(categories);
  });

  test("updateCategory returns the correct category with new details", async () => {
    const createResponse = await callQuery({
      source: CreateCategory,
      variableValues: exampleCategories[0],
      contextValue: {
        space,
      },
    });

    const updateValues = {
      id: createResponse.data?.createCategory.id as string,
      data: {
        type: "Expense",
        name: "Expense test",
        monthlyBudget: 1234,
        description: "Expense test",
        icon: "random",
      },
    };
    const updateResponse = await callQuery({
      source: UpdateCategory,
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
      source: CreateCategory,
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
      source: UpdateCategory,
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
      source: CreateCategory,
      variableValues: exampleCategories[0],
      contextValue: {
        space,
      },
    });

    const deleteResponse = await callQuery({
      source: DeleteCategory,
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
