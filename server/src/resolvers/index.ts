import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { CategoriesResolver } from "./CategoryResolver";
import { EntryResolver } from "./EntryResolver";

const schemaBuild = async () =>
  await buildSchema({
    resolvers: [CategoriesResolver, EntryResolver],
    emitSchemaFile: true,
    validate: false,
  });

export default schemaBuild;
