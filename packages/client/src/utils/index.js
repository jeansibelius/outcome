"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewCategory = exports.toNewEntry = exports.logout = exports.GetCurrentViewMonth = exports.GetActiveSpace = exports.GetMe = exports.IsLoggedIn = void 0;
const client_1 = require("@apollo/client");
const types_1 = require("../types");
const queries_1 = require("../queries");
const cache_1 = require("../cache");
// Function to make the above query callable from anywhere in the app
const IsLoggedIn = () => {
    const { data } = (0, client_1.useQuery)(queries_1.IS_LOGGED_IN);
    return data.isLoggedIn;
};
exports.IsLoggedIn = IsLoggedIn;
const GetMe = () => {
    const { data } = (0, client_1.useQuery)(queries_1.GET_ME);
    return data.me;
};
exports.GetMe = GetMe;
const GetActiveSpace = () => {
    const { data } = (0, client_1.useQuery)(queries_1.GET_ACTIVE_SPACE);
    return data.activeSpace;
};
exports.GetActiveSpace = GetActiveSpace;
const GetCurrentViewMonth = () => {
    const { data } = (0, client_1.useQuery)(queries_1.GET_CURRENT_VIEW_RANGE);
    return data.currentViewMonth;
};
exports.GetCurrentViewMonth = GetCurrentViewMonth;
const logout = async (client) => {
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
    }
    catch (error) {
        console.log(error);
    }
    window.localStorage.removeItem("outcome-token");
    window.localStorage.removeItem("outcome-user");
    (0, cache_1.isLoggedInVar)(false);
    (0, cache_1.currentUserVar)(null);
    return;
};
exports.logout = logout;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (toParse) => {
    if (!toParse || !isString(toParse)) {
        throw new Error(`Field is not set or format is incorrect: ${toParse}.`);
    }
    return toParse;
};
const isDate = (date) => {
    const r = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
    return Boolean(Date.parse(date)) && r.test(new Date(date).toISOString());
};
const parseDate = (toParse) => {
    if (!toParse || !isDate(toParse)) {
        throw new Error("Date is not set or format is incorrect.");
    }
    const date = new Date(toParse);
    const now = new Date();
    const parsedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    return parsedDate;
};
const isNumber = (number) => {
    return typeof number === "number" || number instanceof Number;
};
const parseNumber = (toParse) => {
    if (!toParse || !isNumber(toParse) || isNaN(toParse)) {
        throw new Error("Given amount is not a number.");
    }
    return toParse;
};
const isIncomeExpenseType = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.IncomeExpenseType).includes(param);
};
const parseType = (toParse) => {
    if (!toParse || !isIncomeExpenseType(toParse)) {
        throw new Error(`Type is not set or has an illegal value: ${toParse}`);
    }
    return toParse;
};
const toNewEntry = (object) => {
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
exports.toNewEntry = toNewEntry;
const toNewCategory = (object) => {
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
exports.toNewCategory = toNewCategory;
