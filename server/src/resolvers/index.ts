import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { CategoryResolver } from "./CategoryResolver";
import { LoginResolver } from "./LoginResolver";
import { EntryResolver } from "./EntryResolver";
import { SpaceResolver } from "./SpaceResolver";

const schemaBuild = async () =>
  await buildSchema({
    //resolvers: [__dirname + "/*Resolver.ts"],
    resolvers: [UserResolver, CategoryResolver, EntryResolver, SpaceResolver, LoginResolver],
    emitSchemaFile: true,
    validate: true,
  });

export default schemaBuild;
