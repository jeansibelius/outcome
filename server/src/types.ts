import { registerEnumType } from "type-graphql";
import { ObjectId } from "mongodb";

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

export interface DecodedTokenUser {
  id: string;
  email: string;
}
