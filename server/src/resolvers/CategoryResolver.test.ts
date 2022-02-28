import { ExecutionResult, graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import schemaBuild from ".";
import { connectToDB } from "../index";

import { createCategory, createSpace, returnAllCategories } from "../../../client/src/queries";
import { mongoose } from "@typegoose/typegoose";
import { Space } from "src/entities/Space";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: unknown;
  }>;
}

let schema: GraphQLSchema;
export const callQuery = async ({ source, variableValues }: Options): Promise<ExecutionResult> => {
  if (!schema) schema = await schemaBuild();
  return graphql({
    schema,
    source,
    variableValues,
  });
};

let dbConnection: mongoose.Connection | void;
let space: Space;
beforeAll(async () => {
  dbConnection = await connectToDB();
  const response = await callQuery({
    source: createSpace,
    variableValues: {
      data: {
        name: "Test Space",
      },
    },
  });
  space = response.data?.createSpace;
  console.log("created space", space);
});

afterAll(() => {
  if (dbConnection) dbConnection.close();
});

beforeEach(async () => {
  const vars = {
    categoryData: {
      type: "Expense",
      name: "Test",
      monthlyBudget: 9999,
      description: "Description test",
      icon: "home",
    },
    context: {
      space: space.id,
    },
  };
  console.log("about to initialise category with", vars);
  const response = await callQuery({
    source: createCategory,
    variableValues: {
      ...vars,
    },
  });
  console.log("initialised category", response);
});

describe("When resolving categories", () => {
  test("given a single ID, expect returnSingleCategory to return a single category", async () => {
    const response = await callQuery({
      source: returnAllCategories,
    });
    expect(response).toBe(false);
  });
});
