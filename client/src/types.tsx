export enum IncomeExpenseType {
  Expense = "expense",
  Income = "income",
}

export interface Category {
  id: string;
  type: IncomeExpenseType;
  name: string;
  monthlyBudget?: number;
  description?: string;
  icon?: string;
}

export interface CategoryInput {
  description: unknown;
  icon: unknown;
  monthlyBudget: unknown;
  name: unknown;
  type: unknown;
}

export interface Entry {
  id: string;
  name: string;
  type: IncomeExpenseType;
  date: Date;
  amount: number;
  description?: string;
  category?: Category;
}

export interface EntryInput {
  amount: unknown;
  category: unknown;
  date: unknown;
  description: unknown;
  name: unknown;
  type: unknown;
}
