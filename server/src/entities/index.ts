import { getModelForClass } from "@typegoose/typegoose";
import { Space } from "./Space";
import { User } from "./User";
import { Entry } from "./Entry";
import { Category } from "./Category";

// Model creation is done here to avoid circular dependency problems created by js runtime
// https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes/#circular-dependencies
export const SpaceModel = getModelForClass(Space);
export const UserModel = getModelForClass(User);
export const EntryModel = getModelForClass(Entry);
export const CategoryModel = getModelForClass(Category);
