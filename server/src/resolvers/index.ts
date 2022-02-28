import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { CategoryResolver } from "./CategoryResolver";
import { EntryResolver } from "./EntryResolver";
import { UserResolver } from "./UserResolver";
import { LoginResolver } from "./LoginResolver";
import { SpaceResolver } from "./SpaceResolver";

const schemaBuild = async () =>
  await buildSchema({
    resolvers: [CategoryResolver, EntryResolver, UserResolver, LoginResolver, SpaceResolver],
    emitSchemaFile: true,
    validate: true,
  });

export default schemaBuild;
