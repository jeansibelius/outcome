import { ExecutionResult, graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import schemaBuild from ".";

import { connectToDB } from "../utils";

import { createCategory, createSpace, returnAllCategories } from "../../../client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { Space } from "src/entities/Space";
import { CategoryModel, SpaceModel } from "../entities/index";
import { Category } from "src/entities/Category";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: unknown;
  }>;
  contextValue?: unknown;
}

let schema: GraphQLSchema;
export const callQuery = async ({
  source,
  variableValues,
  contextValue,
}: Options): Promise<ExecutionResult> => {
  if (!schema) schema = await schemaBuild();
  return graphql({
    schema,
    source,
    variableValues,
    contextValue,
  });
};

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

let category: Category;
describe("When resolving categories", () => {
  beforeEach(async () => {
    const vars = {
      categoryData: {
        type: "Expense",
        name: "Test",
        monthlyBudget: 9999,
        description: "Description test",
        icon: "home",
      },
    };
    const categoryResponse = await callQuery({
      source: createCategory,
      variableValues: {
        ...vars,
      },
      contextValue: {
        space,
      },
    });
    category = categoryResponse.data?.createCategory;
    console.log("initialised category", category);
  });

  test("given a single ID, expect returnSingleCategory to return a single category", async () => {
    const response = await callQuery({
      source: returnAllCategories,
      contextValue: {
        space,
      },
    });
    expect(response).toMatchObject({
      data: {
        returnAllCategories: [category],
      },
    });
  });
});
