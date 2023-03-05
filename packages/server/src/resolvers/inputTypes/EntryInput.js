"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryUpdateInput = exports.EntryInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const types_1 = require("../../types");
let EntryInput = class EntryInput {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => types_1.IncomeExpenseType)
], EntryInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsDate)()
], EntryInput.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(1, 255)
], EntryInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)()
], EntryInput.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => String, { nullable: true })
], EntryInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(255)
], EntryInput.prototype, "description", void 0);
EntryInput = __decorate([
    (0, type_graphql_1.InputType)()
], EntryInput);
exports.EntryInput = EntryInput;
let EntryUpdateInput = class EntryUpdateInput {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => types_1.IncomeExpenseType, { nullable: true })
], EntryUpdateInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsDate)()
], EntryUpdateInput.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Length)(1, 255)
], EntryUpdateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true })
], EntryUpdateInput.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => String, { nullable: true })
], EntryUpdateInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(255)
], EntryUpdateInput.prototype, "description", void 0);
EntryUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], EntryUpdateInput);
exports.EntryUpdateInput = EntryUpdateInput;
