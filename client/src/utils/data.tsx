import { CustomHorizontalBarData } from "../components/charts/CustomHorizontalBar";
import { CustomPieChartData } from "../components/charts/CustomResponsivePie";
import { Category, Entry, IncomeExpenseType } from "../types";

export const categoriesToIdAndValue = (array: Category[]): CustomPieChartData[] =>
  array.reduce(
    (obj: any[], cat: Category) =>
      obj.concat({ id: cat.name, value: cat.monthlyBudget, type: cat.type }),
    []
  );

export const entriesByCategoryToAndIdAndValue = (array: Entry[]): CustomPieChartData[] => {
  console.log("entries", array);
  return array.reduce((arr: any[], entry: Entry) => {
    const isSameCategoryAndType = (el: CustomPieChartData) =>
      el.id === (entry.category ? entry.category.name : undefined) && el.type === entry.type;
    // Check if category & type combination already exists and get index
    const catIndex = arr.findIndex(isSameCategoryAndType);
    // If index doesn't exist, use the next available one
    const index = catIndex === -1 ? arr.length : catIndex;
    // Get total for new sum or initialise to 0
    const total = arr[index] ? arr[index]["value"] : 0;
    arr[index] = {
      id: entry.category?.name ? entry.category.name : "uncategorised",
      value: total + entry.amount,
      type: entry.type,
    };
    return arr;
  }, []);
};

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
