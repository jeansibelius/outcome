"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.PublicUser = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const Space_1 = require("./Space");
let PublicUser = class PublicUser {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
], PublicUser.prototype, "first_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
], PublicUser.prototype, "last_name", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Space_1.Space]),
    (0, typegoose_1.prop)({ ref: () => Space_1.Space, required: true })
], PublicUser.prototype, "spaces", void 0);
PublicUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], PublicUser);
exports.PublicUser = PublicUser;
let User = class User extends PublicUser {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: true })
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true })
], User.prototype, "password_hash", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
