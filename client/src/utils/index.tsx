import { EntryInput, IncomeExpenseType, NewEntry } from "../types";

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
    description: parseString(object.description),
    category: parseString(object.category),
  };
  return newEntry;
};

export const getYearMonthDay = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};
