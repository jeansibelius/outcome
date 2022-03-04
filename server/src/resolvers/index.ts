import "reflect-metadata";
import { buildSchema } from "type-graphql";

const schemaBuild = async () =>
  await buildSchema({
    resolvers: [__dirname + "/*Resolver.ts"],
    emitSchemaFile: true,
    validate: true,
  });

export default schemaBuild;
