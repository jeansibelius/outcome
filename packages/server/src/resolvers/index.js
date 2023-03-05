"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./UserResolver");
const CategoryResolver_1 = require("./CategoryResolver");
const LoginResolver_1 = require("./LoginResolver");
const EntryResolver_1 = require("./EntryResolver");
const SpaceResolver_1 = require("./SpaceResolver");
const schemaBuild = async () => await (0, type_graphql_1.buildSchema)({
    //resolvers: [__dirname + "/*Resolver.ts"],
    resolvers: [
        UserResolver_1.UserResolver,
        CategoryResolver_1.CategoryResolver,
        EntryResolver_1.EntryResolver,
        SpaceResolver_1.SpaceResolver,
        LoginResolver_1.LoginResolver,
    ],
    emitSchemaFile: true,
    validate: true,
});
exports.default = schemaBuild;
