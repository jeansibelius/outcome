"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceResolver = void 0;
const entities_1 = require("../entities");
const Space_1 = require("../entities/Space");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
const populatePaths = "users";
let SpaceResolver = class SpaceResolver {
    async returnAllSpaces() {
        return await entities_1.SpaceModel.find().populate(populatePaths);
    }
    async createSpace({ name, users }) {
        const space = await entities_1.SpaceModel.create({
            name,
            users,
        });
        await space.save();
        return space.populate(populatePaths);
    }
    async updateSpace(id, spaceUpdate) {
        const space = await entities_1.SpaceModel.findByIdAndUpdate(id, {
            ...spaceUpdate,
        }, { new: true });
        if (!space) {
            throw new Error("Invalid space id");
        }
        return space.populate(populatePaths);
    }
    async addUserToSpace(spaceId, userId) {
        const space = await entities_1.SpaceModel.findById({ _id: spaceId });
        if (!space) {
            throw new Error("Invalid space id");
        }
        const user = await entities_1.UserModel.findById({ _id: userId });
        if (!user) {
            throw new Error("Invalid user id");
        }
        let typedUserId = undefined;
        let typedSpaceId = undefined;
        if (typeof user.id === "string")
            typedUserId = new mongoose_1.Types.ObjectId(user.id);
        if (typeof space.id === "string")
            typedSpaceId = new mongoose_1.Types.ObjectId(space.id);
        // Add user id to space, if it doesn't exist there already
        if (space.users && !space.users.includes(typedUserId)) {
            space.users = space.users.concat(typedUserId);
            await space.save();
        }
        // Add space id to user, if it doesn't exist there already
        if (user.spaces && !user.spaces.includes(typedSpaceId)) {
            user.spaces = user.spaces.concat(typedSpaceId);
            await user.save();
        }
        return space.populate(populatePaths);
    }
    async deleteUserFromSpace(id, userId) {
        const space = await entities_1.SpaceModel.findById({ _id: id });
        if (!space) {
            throw new Error("Invalid space id");
        }
        const user = await entities_1.UserModel.findById({ _id: userId });
        if (!user) {
            throw new Error("Invalid user id");
        }
        let typedUserId = undefined;
        let typedSpaceId = undefined;
        if (typeof user.id === "string")
            typedUserId = new mongoose_1.Types.ObjectId(user.id);
        if (typeof space.id === "string")
            typedSpaceId = new mongoose_1.Types.ObjectId(space.id);
        if (space.users && space.users.includes(typedUserId)) {
            space.users = space.users.filter((id) => id?.toString() !== user.id);
            await space.save();
        }
        if (user.spaces && user.spaces.includes(typedSpaceId)) {
            user.spaces = user.spaces.filter((id) => id?.toString() !== space.id);
            await user.save();
        }
        return space.populate(populatePaths);
    }
    async deleteSpace(id) {
        // TODO: Find all entries and categories associated with given space and delete them first
        // For associated users, delete only if each user has more than given space associated with them. Else return error. Other option: make the spaces in a user optional and allow a null state (user could create a space in the UI)
        const result = await entities_1.SpaceModel.deleteOne({ _id: id });
        return result.deletedCount;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Space_1.Space])
], SpaceResolver.prototype, "returnAllSpaces", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Space_1.Space),
    __param(0, (0, type_graphql_1.Arg)("data"))
], SpaceResolver.prototype, "createSpace", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Space_1.Space),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data"))
], SpaceResolver.prototype, "updateSpace", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Space_1.Space),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("userId"))
], SpaceResolver.prototype, "addUserToSpace", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Space_1.Space),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("userId"))
], SpaceResolver.prototype, "deleteUserFromSpace", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id"))
], SpaceResolver.prototype, "deleteSpace", null);
SpaceResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SpaceResolver);
exports.SpaceResolver = SpaceResolver;
