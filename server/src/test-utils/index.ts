import { GraphQLSchema, ExecutionResult, graphql } from "graphql";
import { Maybe } from "type-graphql";
import schemaBuild from "../resolvers";

interface CallQueryOptions {
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
}: CallQueryOptions): Promise<ExecutionResult> => {
  if (!schema) schema = await schemaBuild();
  return graphql({
    schema,
    source,
    variableValues,
    contextValue,
  });
};
