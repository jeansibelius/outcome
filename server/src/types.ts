import { registerEnumType } from "type-graphql";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { Context } from "apollo-server-core";

// TODO consider removing this, if not needed (does typegoose ref provide typeguards?)
export type Ref<T> = T | ObjectId;

export enum IncomeExpenseType {
  Income = "Income",
  Expense = "Expense",
}

registerEnumType(IncomeExpenseType, {
  name: "IncomeExpenseType",
  description: "Can be either income or expense.",
});

export interface AuthResponse {
  token: string;
}

export interface DecodedJwtToken extends jwt.JwtPayload {
  id?: string;
}

export interface ContextType extends Context {
  user: DecodedJwtToken;
  space?: string;
}
