"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultUserAndSpace = exports.createDefaultUser = exports.createDefaultSpace = exports.resetDB = exports.callQuery = void 0;
const graphql_1 = require("graphql");
const resolvers_1 = __importDefault(require("../resolvers"));
const index_1 = require("../entities/index");
const utils_1 = require("../utils");
const testHelpers_1 = require("./testHelpers");
let schema;
const callQuery = async ({ source, variableValues, contextValue, }) => {
    if (!schema)
        schema = await (0, resolvers_1.default)();
    return (0, graphql_1.graphql)({
        schema,
        source,
        variableValues,
        contextValue,
    });
};
exports.callQuery = callQuery;
const resetDB = async () => {
    const deletedUsers = await index_1.UserModel.deleteMany({});
    console.log(`deleted ${deletedUsers.deletedCount} user(s)`);
    const deletedSpaces = await index_1.SpaceModel.deleteMany({});
    console.log(`deleted ${deletedSpaces.deletedCount} space(s)`);
    const deletedCategories = await index_1.CategoryModel.deleteMany({});
    console.log(`deleted ${deletedCategories.deletedCount} categorie(s)`);
    const deletedEntries = await index_1.EntryModel.deleteMany({});
    console.log(`deleted ${deletedEntries.deletedCount} entrie(s)`);
};
exports.resetDB = resetDB;
const createDefaultSpace = async () => {
    const space = await index_1.SpaceModel.create({ name: "Test Space" });
    console.log("created space", space);
    return space;
};
exports.createDefaultSpace = createDefaultSpace;
const createDefaultUser = async () => {
    const user = await index_1.UserModel.create({
        first_name: testHelpers_1.exampleUser.first_name,
        last_name: testHelpers_1.exampleUser.last_name,
        password_hash: await (0, utils_1.getHashedPassword)(testHelpers_1.exampleUser.password),
        email: testHelpers_1.exampleUser.email,
    });
    console.log("created user", user);
    return user;
};
exports.createDefaultUser = createDefaultUser;
const createDefaultUserAndSpace = async () => {
    const user = await (0, exports.createDefaultUser)();
    const space = await (0, exports.createDefaultSpace)();
    space.users = space.users?.concat(user);
    user.spaces = user.spaces?.concat(space);
    await user.save();
    await space.save();
    return {
        defaultUser: { id: user.id },
        defaultSpaceID: space.id,
    };
};
exports.createDefaultUserAndSpace = createDefaultUserAndSpace;
