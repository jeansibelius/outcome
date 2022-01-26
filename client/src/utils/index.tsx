import { CategoryInput, EntryInput, IncomeExpenseType, NewCategory, NewEntry } from "../types";

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
  return Boolean(Date.parse(date)) && r.test(date);
};

const parseDate = (toParse: unknown): string => {
  if (!toParse || !isDate(toParse)) {
    throw new Error("Date is not set or format is incorrect.");
  }
  return toParse;
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
    date: new Date(parseDate(object.date)),
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
    monthlyBudget: object.monthlyBudget ? parseNumber(object.monthlyBudget) : null,
    description: object.description ? parseString(object.description) : null,
    icon: object.icon ? parseString(object.icon) : undefined,
  };
  return newCategory;
};

export const getYearMonthDay = (date = new Date()): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${month}-${day}`;
};
