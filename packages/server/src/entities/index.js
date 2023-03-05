"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.EntryModel = exports.UserModel = exports.SpaceModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Space_1 = require("./Space");
const User_1 = require("./User");
const Entry_1 = require("./Entry");
const Category_1 = require("./Category");
// Model creation is done here to avoid circular dependency problems created by js runtime
// https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes/#circular-dependencies
exports.SpaceModel = (0, typegoose_1.getModelForClass)(Space_1.Space);
exports.UserModel = (0, typegoose_1.getModelForClass)(User_1.User);
exports.EntryModel = (0, typegoose_1.getModelForClass)(Entry_1.Entry);
exports.CategoryModel = (0, typegoose_1.getModelForClass)(Category_1.Category);
