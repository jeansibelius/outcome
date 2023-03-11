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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = require("mongoose");
const User_1 = require("../entities/User");
const entities_1 = require("../entities");
const utils_1 = require("../utils");
const populatePaths = "spaces";
let UserResolver = class UserResolver {
    /* TODO restrict to ADMIN
    @Query(() => [User])
    // eslint-disable-next-line
    async returnAllUsers(@Ctx() { user }: { user: DecodedJwtToken }) {
      if (!user) {
        throw new Error("Access denied.");
      }
      return await UserModel.find().populate(populatePaths);
    }
    */
    async createUser({ first_name, last_name, password, email }, ctx) {
        const userExists = await entities_1.UserModel.findOne({ email: email }, "email");
        if (userExists) {
            throw new Error("A user with these details exists.");
        }
        const password_hash = await (0, utils_1.getHashedPassword)(password);
        const user = await entities_1.UserModel.create({
            first_name,
            last_name,
            password_hash,
            email,
        });
        // If there no space defined context (i.e. an existing user is not adding a new user), create a new default space for the new user
        if (!ctx || !ctx.space) {
            const newSpace = await entities_1.SpaceModel.create({
                name: "My Budget",
                users: [user.id],
            });
            const typedNewSpaceId = typeof newSpace.id === "string"
                ? new mongoose_1.Types.ObjectId(newSpace.id)
                : undefined;
            user.spaces = user.spaces.concat(typedNewSpaceId);
        }
        else {
            user.spaces = user.spaces.concat(new typegoose_1.mongoose.Types.ObjectId(ctx.space));
        }
        await user.save();
        return user.populate(populatePaths);
    }
    async updateUser(id, userUpdate) {
        const user = await entities_1.UserModel.findByIdAndUpdate(id, { ...userUpdate }, { new: true });
        if (!user) {
            throw new Error("Invalid user id");
        }
        return user.populate(populatePaths);
    }
    async deleteUser(id) {
        const { deletedCount } = await entities_1.UserModel.deleteOne({ _id: id });
        return deletedCount;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __param(1, (0, type_graphql_1.Ctx)())
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data"))
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Number),
    __param(0, (0, type_graphql_1.Arg)("id"))
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
