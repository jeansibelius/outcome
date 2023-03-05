"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const types_1 = require("../types");
const Space_1 = require("./Space");
let Category = class Category {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
], Category.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => types_1.IncomeExpenseType),
    (0, typegoose_1.prop)({ required: true })
], Category.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
], Category.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Space_1.Space),
    (0, typegoose_1.prop)({ ref: () => Space_1.Space, required: true })
], Category.prototype, "space", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typegoose_1.prop)()
], Category.prototype, "monthlyBudget", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typegoose_1.prop)()
], Category.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typegoose_1.prop)()
], Category.prototype, "icon", void 0);
Category = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "The category model" })
], Category);
exports.Category = Category;
