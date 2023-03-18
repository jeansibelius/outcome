import { GraphQLSchema, ExecutionResult, graphql } from "graphql";
import { Maybe } from "type-graphql";
import schemaBuild from "../resolvers";

import {
  CategoryModel,
  EntryModel,
  SpaceModel,
  UserModel,
} from "../entities/index";
import { getHashedPassword } from "../utils";
import { exampleUser } from "./testHelpers";
import { Space } from "src/entities/Space";
import { User } from "src/entities/User";
import { mongoose } from "@typegoose/typegoose";

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

export const resetDB = async () => {
  const deletedUsers = await UserModel.deleteMany({});
  console.log(`deleted ${deletedUsers.deletedCount} user(s)`);

  const deletedSpaces = await SpaceModel.deleteMany({});
  console.log(`deleted ${deletedSpaces.deletedCount} space(s)`);

  const deletedCategories = await CategoryModel.deleteMany({});
  console.log(`deleted ${deletedCategories.deletedCount} categorie(s)`);

  const deletedEntries = await EntryModel.deleteMany({});
  console.log(`deleted ${deletedEntries.deletedCount} entrie(s)`);
};

export const createDefaultSpace = async (): Promise<
  mongoose.Document & Space
> => {
  const space = await SpaceModel.create({ name: "Test Space" });
  console.log("created space", space);
  return space;
};

export const createDefaultUser = async (): Promise<
  mongoose.Document & User
> => {
  const user = await UserModel.create({
    first_name: exampleUser.first_name,
    last_name: exampleUser.last_name,
    password_hash: await getHashedPassword(exampleUser.password),
    email: exampleUser.email,
  });
  console.log("created user", user);
  return user;
};

export const createDefaultUserAndSpace = async (): Promise<{
  defaultUser: { id: string };
  defaultSpaceID: string;
}> => {
  const user = await createDefaultUser();
  const space = await createDefaultSpace();

  space.users = space.users?.concat(user);
  user.spaces = user.spaces?.concat(space);

  await user.save();
  await space.save();

  return {
    defaultUser: { id: user.id as string },
    defaultSpaceID: space.id as string,
  };
};
