"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceUpdateInput = exports.SpaceInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let SpaceInput = class SpaceInput {
};
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: "Home" }),
    (0, class_validator_1.Length)(1, 255)
], SpaceInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [String], { nullable: true })
], SpaceInput.prototype, "users", void 0);
SpaceInput = __decorate([
    (0, type_graphql_1.InputType)()
], SpaceInput);
exports.SpaceInput = SpaceInput;
let SpaceUpdateInput = class SpaceUpdateInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.Length)(1, 255)
], SpaceUpdateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [String], { nullable: true })
], SpaceUpdateInput.prototype, "users", void 0);
SpaceUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], SpaceUpdateInput);
exports.SpaceUpdateInput = SpaceUpdateInput;
