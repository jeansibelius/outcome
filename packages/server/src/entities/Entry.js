"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const Category_1 = require("./Category");
const User_1 = require("./User");
const Space_1 = require("./Space");
const types_1 = require("../types");
let Entry = class Entry {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
], Entry.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => types_1.IncomeExpenseType),
    (0, typegoose_1.prop)({ required: true })
], Entry.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: new Date(), required: true })
], Entry.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
], Entry.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
], Entry.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => User_1.User),
    (0, typegoose_1.prop)({ ref: () => User_1.User })
], Entry.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Space_1.Space),
    (0, typegoose_1.prop)({ ref: () => Space_1.Space, required: true })
], Entry.prototype, "space", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Category_1.Category, { nullable: true }),
    (0, typegoose_1.prop)({ ref: () => Category_1.Category, nullable: true })
], Entry.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typegoose_1.prop)({ nullable: true })
], Entry.prototype, "description", void 0);
Entry = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "The Entry model for income and expense rows." })
], Entry);
exports.Entry = Entry;
