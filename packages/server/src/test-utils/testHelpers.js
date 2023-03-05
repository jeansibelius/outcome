"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleEntries = exports.exampleCategories = exports.exampleSpaces = exports.exampleUsers = exports.exampleUser = void 0;
exports.exampleUser = {
    first_name: "Test",
    last_name: "User",
    password: "test",
    email: "test@user.com",
};
exports.exampleUsers = [
    {
        data: {
            first_name: "Test 1",
            last_name: "User 1",
            password: "test1",
            email: "test1@user.com",
        },
    },
    {
        data: {
            first_name: "Test 2",
            last_name: "User 2",
            password: "test2",
            email: "test2@user.com",
        },
    },
    {
        data: {
            first_name: "Test 3",
            last_name: "User 3",
            password: "test3",
            email: "test3@user.com",
        },
    },
];
exports.exampleSpaces = [
    {
        data: {
            name: "Space 1",
        },
    },
    {
        data: {
            name: "Space 2",
        },
    },
    {
        data: {
            name: "Space 3",
        },
    },
];
exports.exampleCategories = [
    {
        categoryData: {
            type: "Expense",
            name: "Expense 1",
            monthlyBudget: 9999,
            description: "Expense test 1",
            icon: "home",
        },
    },
    {
        categoryData: {
            type: "Expense",
            name: "Expense 2",
            monthlyBudget: 0,
            description: "Expense test 2",
            icon: "home",
        },
    },
    {
        categoryData: {
            type: "Expense",
            name: "Expense 3",
            description: "Expense test 3 no budget or icon",
        },
    },
    {
        categoryData: {
            type: "Income",
            name: "Income 1",
            monthlyBudget: 9999,
            description: "Income test 1",
            icon: "home",
        },
    },
    {
        categoryData: {
            type: "Income",
            name: "Income 2",
            monthlyBudget: 0,
            description: "Income test 2",
            icon: "home",
        },
    },
    {
        categoryData: {
            type: "Income",
            name: "Income 3",
            description: "Income test 3 no budget or icon",
        },
    },
];
exports.exampleEntries = [
    {
        entryData: {
            type: "Expense",
            date: "2021-12-29T00:00:00.000Z",
            name: "Expense 1",
            amount: 112.1,
            description: "Another test",
        },
    },
    {
        entryData: {
            type: "Expense",
            date: "2021-12-19T00:00:00.000Z",
            name: "Expense 2",
            amount: 1,
        },
    },
    {
        entryData: {
            type: "Expense",
            date: "2021-12-09T00:00:00.000Z",
            name: "Expense 3",
            amount: 99999999999,
            description: "Another test",
        },
    },
    {
        entryData: {
            type: "Income",
            date: "2021-12-29T00:00:00.000Z",
            name: "Income 1",
            amount: 112.1,
            description: "Another test",
        },
    },
    {
        entryData: {
            type: "Income",
            date: "2021-12-19T00:00:00.000Z",
            name: "Income 2",
            amount: 1,
        },
    },
    {
        entryData: {
            type: "Income",
            date: "2021-12-09T00:00:00.000Z",
            name: "Income 3",
            amount: 999999999999,
            description: "Another test",
        },
    },
];
