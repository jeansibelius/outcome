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
exports.CategoryResolver = void 0;
const Category_1 = require("../entities/Category");
const entities_1 = require("../entities");
const type_graphql_1 = require("type-graphql");
const populatePaths = ["space"];
let CategoryResolver = class CategoryResolver {
    async returnAllCategories({ space }) {
        return await entities_1.CategoryModel.find({ space }).populate(populatePaths);
    }
    async createCategory({ type, name, monthlyBudget, description, icon }, { space }) {
        const category = await entities_1.CategoryModel.create({
            type,
            name,
            monthlyBudget,
            description,
            icon,
            space,
        });
        await category.save();
        return category.populate(populatePaths);
    }
    async updateCategory(id, categoryData) {
        const category = await entities_1.CategoryModel.findByIdAndUpdate(id, {
            ...categoryData,
        }, { new: true });
        if (!category) {
            throw new Error("Invalid category id");
        }
        return category.populate(populatePaths);
    }
    async deleteCategory(id, ctx) {
        // De-associate all related entries from the category to be deleted
        await entities_1.EntryModel.updateMany({ category: id }, { category: null });
        await entities_1.CategoryModel.deleteOne({ _id: id, space: ctx.space });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Category_1.Category]),
    __param(0, (0, type_graphql_1.Ctx)())
], CategoryResolver.prototype, "returnAllCategories", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __param(1, (0, type_graphql_1.Ctx)())
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data"))
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)())
], CategoryResolver.prototype, "deleteCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
