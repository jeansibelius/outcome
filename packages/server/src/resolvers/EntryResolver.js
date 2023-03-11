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
exports.EntryResolver = void 0;
const Entry_1 = require("../entities/Entry");
const entities_1 = require("../entities");
const type_graphql_1 = require("type-graphql");
const populatePaths = ["category", "user"];
let EntryResolver = class EntryResolver {
    async returnAllEntries({ space }) {
        return await entities_1.EntryModel.find({ space }).populate(populatePaths);
    }
    async createEntry({ type, date, name, amount, category, description }, { user, space }) {
        const entry = await entities_1.EntryModel.create({
            type,
            date,
            name,
            amount,
            category,
            description,
            user: user.id,
            space,
        });
        return entry.populate(populatePaths);
    }
    async updateEntry(id, entryUpdate) {
        const entry = await entities_1.EntryModel.findByIdAndUpdate(id, {
            ...entryUpdate,
        }, { new: true });
        if (!entry) {
            throw new Error("Invalid entry id");
        }
        return entry.populate(populatePaths);
    }
    async deleteEntry(id, { space }) {
        await entities_1.EntryModel.deleteOne({ _id: id, space });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Entry_1.Entry]),
    __param(0, (0, type_graphql_1.Ctx)())
], EntryResolver.prototype, "returnAllEntries", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Entry_1.Entry),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __param(1, (0, type_graphql_1.Ctx)())
], EntryResolver.prototype, "createEntry", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Entry_1.Entry),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data"))
], EntryResolver.prototype, "updateEntry", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)())
], EntryResolver.prototype, "deleteEntry", null);
EntryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], EntryResolver);
exports.EntryResolver = EntryResolver;
