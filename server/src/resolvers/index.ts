import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { CategoriesResolver } from "./CategoryResolver";
import { EntryResolver } from "./EntryResolver";
import { UserResolver } from "./UserResolver";

const schemaBuild = async () =>
  await buildSchema({
    resolvers: [CategoriesResolver, EntryResolver, UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

export default schemaBuild;
