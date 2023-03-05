"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateInput = exports.CategoryInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const types_1 = require("../../types");
let CategoryInput = class CategoryInput {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => types_1.IncomeExpenseType)
], CategoryInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(1, 255)
], CategoryInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true })
], CategoryInput.prototype, "monthlyBudget", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(255)
], CategoryInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true })
], CategoryInput.prototype, "icon", void 0);
CategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], CategoryInput);
exports.CategoryInput = CategoryInput;
let CategoryUpdateInput = class CategoryUpdateInput {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => types_1.IncomeExpenseType, { nullable: true })
], CategoryUpdateInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Length)(1, 255)
], CategoryUpdateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true })
], CategoryUpdateInput.prototype, "monthlyBudget", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(255)
], CategoryUpdateInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true })
], CategoryUpdateInput.prototype, "icon", void 0);
CategoryUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], CategoryUpdateInput);
exports.CategoryUpdateInput = CategoryUpdateInput;
