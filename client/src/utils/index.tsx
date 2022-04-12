import { ApolloClient, useQuery } from "@apollo/client";
import {
  CategoryInput,
  EntryInput,
  IncomeExpenseType,
  localStorageUser,
  NewCategory,
  NewEntry,
  Space,
} from "../types";
import {
  IS_LOGGED_IN,
  GET_ME,
  GET_ACTIVE_SPACE,
  GET_CURRENT_VIEW_MONTH,
} from "../queries";
import { isLoggedInVar, currentUserVar } from "../cache";

// Function to make the above query callable from anywhere in the app
export const IsLoggedIn = (): boolean => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn;
};

export const GetMe = (): localStorageUser => {
  const { data } = useQuery(GET_ME);
  return data.me;
};

export const GetActiveSpace = (): Space => {
  const { data } = useQuery(GET_ACTIVE_SPACE);
  return data.activeSpace;
};

export const GetCurrentViewMonth = (): Date => {
  const { data } = useQuery(GET_CURRENT_VIEW_MONTH);
  return data.currentViewMonth;
};

export const logout = async (client: ApolloClient<object>): Promise<void> => {
  try {
    await client.cache.reset();
    /*
    client.cache.evict({
      fieldName: "returnAllCategories",
    });
    client.cache.evict({
      fieldName: "returnAllEntries",
    });
    */
    client.cache.gc();
  } catch (error) {
    console.log(error);
  }
  window.localStorage.removeItem("outcome-token");
  window.localStorage.removeItem("outcome-user");
  isLoggedInVar(false);
  currentUserVar(null);
  return;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (toParse: unknown): string => {
  if (!toParse || !isString(toParse)) {
    throw new Error(`Field is not set or format is incorrect: ${toParse}.`);
  }
  return toParse;
};

const isDate = (date: any): date is string => {
  const r = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
  return Boolean(Date.parse(date)) && r.test(new Date(date).toISOString());
};

const parseDate = (toParse: unknown): Date => {
  if (!toParse || !isDate(toParse)) {
    throw new Error("Date is not set or format is incorrect.");
  }
  const date = new Date(toParse);
  const now = new Date();
  const parsedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
  return parsedDate;
};

const isNumber = (number: any): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseNumber = (toParse: unknown): number => {
  if (!toParse || !isNumber(toParse) || isNaN(toParse)) {
    throw new Error("Given amount is not a number.");
  }
  return toParse;
};

const isIncomeExpenseType = (param: any): param is IncomeExpenseType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(IncomeExpenseType).includes(param);
};

const parseType = (toParse: unknown): IncomeExpenseType => {
  if (!toParse || !isIncomeExpenseType(toParse)) {
    throw new Error(`Type is not set or has an illegal value: ${toParse}`);
  }
  return toParse;
};

export const toNewEntry = (object: EntryInput): NewEntry => {
  const newEntry = {
    type: parseType(object.type),
    date: parseDate(object.date),
    name: parseString(object.name),
    amount: parseNumber(object.amount),
    description: object.description ? parseString(object.description) : null,
    category: object.category ? parseString(object.category) : null,
  };
  return newEntry;
};

export const toNewCategory = (object: CategoryInput): NewCategory => {
  const newCategory = {
    type: parseType(object.type),
    name: parseString(object.name),
    monthlyBudget: object.monthlyBudget
      ? parseNumber(object.monthlyBudget)
      : null,
    description: object.description ? parseString(object.description) : null,
    icon: object.icon ? parseString(object.icon) : undefined,
  };
  return newCategory;
};

export const getYearMonthDay = (date = new Date()): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${month}-${day}`;
};

export const getCountOfDaysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();
