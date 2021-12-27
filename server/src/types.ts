import { registerEnumType } from "type-graphql";
import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;

export enum IncomeExpenseType {
  Income = "income",
  Expense = "expense",
}

registerEnumType(IncomeExpenseType, {
  name: "IncomeExpenseType",
  description: "Can be either income or expense.",
});
