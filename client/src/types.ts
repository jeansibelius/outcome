export enum IncomeExpenseType {
  Expense = "Expense",
  Income = "Income",
}

export interface Category {
  id: string;
  type: IncomeExpenseType;
  name: string;
  monthlyBudget?: number | null;
  description?: string | null;
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

export interface Space {
  id: string;
  name: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  spaces: Space[];
}

export interface Entry {
  id: string;
  type: IncomeExpenseType;
  date: Date;
  name: string;
  amount: number;
  user: Partial<User>;
  description?: string | null;
  category?: Category;
}

export interface NewEntry extends Omit<Entry, "id" | "category" | "user"> {
  category?: string | null;
}

export interface EntryInput {
  type: unknown;
  date: unknown;
  name: unknown;
  amount: unknown;
  description?: unknown;
  category?: unknown;
}

export type localStorageUser = Omit<User, "id" | "email"> | null;

export interface CustomPieChartData {
  id: string;
  value: number;
  type: string;
  color?: string;
}
