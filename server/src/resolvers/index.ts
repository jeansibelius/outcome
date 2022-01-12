import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { CategoriesResolver } from "./CategoryResolver";
import { EntryResolver } from "./EntryResolver";
import { UserResolver } from "./UserResolver";
import { LoginResolver } from "./LoginResolver";

const schemaBuild = async () =>
  await buildSchema({
    resolvers: [CategoriesResolver, EntryResolver, UserResolver, LoginResolver],
    emitSchemaFile: true,
    validate: true,
  });

export default schemaBuild;
