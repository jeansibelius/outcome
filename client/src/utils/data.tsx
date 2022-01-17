import { CustomHorizontalBarData } from "../components/charts/CustomHorizontalBar";
import { PieChartData } from "../components/charts/CustomResponsivePie";
import { Category, Entry, IncomeExpenseType } from "../types";

export const categoriesToIdAndValue = (array: Category[]): PieChartData[] =>
  array.reduce(
    (obj: any[], cat: Category) =>
      obj.concat({ id: cat.name, value: cat.monthlyBudget, type: cat.type }),
    []
  );

export const entriesToBarChartData = (array: Entry[]): CustomHorizontalBarData[] =>
  array.reduce((data: any[], entry: Entry) => {
    let index = entry.type === IncomeExpenseType.Expense ? 0 : 1;
    data[index] = {
      ...data[index],
      [entry.name]: entry.amount,
      type: entry.type,
    };
    return data;
  }, []);

export const entriesToBarChartKeys = (array: Entry[]): string[] =>
  Array.from(
    // Remove duplicate values
    new Set(array.reduce((arr: string[], entry: Entry) => arr.concat(entry.name), []))
  );

export const entriesToIncomeAndExpenseSumBarData = (array: Entry[]): CustomHorizontalBarData[] =>
  array.reduce((data: any[], entry: Entry) => {
    let index = entry.type === "Expense" ? 0 : 1;
    let sum = data[index] ? data[index]["total"] : 0;
    data[index] = {
      total: sum + entry.amount,
      [entry.type]: sum + entry.amount,
      type: entry.type,
    };
    return data;
  }, []);

export const entriesToIncomeAndExpenseSumBarDataKeys = (array: Entry[]): string[] =>
  Array.from(
    // Remove duplicate values
    new Set(array.reduce((arr: string[], entry: Entry) => arr.concat(entry.type), []))
  );
