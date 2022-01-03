export enum IncomeExpenseType {
  Expense = "Expense",
  Income = "Income",
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
  type: unknown;
  name: unknown;
  monthlyBudget?: unknown;
  description?: unknown;
  icon?: unknown;
}

export type NewCategory = Omit<Category, "id">;

export interface Entry {
  id: string;
  type: IncomeExpenseType;
  date: Date;
  name: string;
  amount: number;
  description?: string;
  category?: Category;
}

export interface NewEntry extends Omit<Entry, "id" | "category"> {
  category: string;
}

export interface EntryInput {
  type: unknown;
  date: unknown;
  name: unknown;
  amount: unknown;
  description?: unknown;
  category?: unknown;
}
