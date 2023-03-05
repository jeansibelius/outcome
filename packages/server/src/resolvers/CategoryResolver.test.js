"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToDB_1 = __importDefault(require("../utils/connectToDB"));
const test_utils_1 = require("../test-utils");
const queries_1 = require("@packages/client/src/queries");
const testHelpers_1 = require("../test-utils/testHelpers");
let space;
let dbConnection;
beforeAll(async () => {
    dbConnection = await (0, connectToDB_1.default)();
});
beforeEach(async () => {
    await (0, test_utils_1.resetDB)();
    const newSpace = await (0, test_utils_1.createDefaultSpace)();
    space = newSpace.id;
});
const CreateCategory = queries_1.createCategory;
const DeleteCategory = queries_1.deleteCategory;
const ReturnAllCategories = queries_1.returnAllCategories;
const UpdateCategory = queries_1.updateCategory;
afterAll(async () => {
    await dbConnection?.close();
    console.log("closed db connection");
});
describe("When resolving categories", () => {
    test("createCategory returns a new category with correct details", async () => {
        const variableValues = {
            categoryData: {
                type: "Expense",
                name: "Expense test",
                monthlyBudget: 1234,
                description: "Expense test",
                icon: "random",
            },
        };
        const response = await (0, test_utils_1.callQuery)({
            source: CreateCategory,
            variableValues,
            contextValue: {
                space,
            },
        });
        expect(response).toMatchObject({
            data: { createCategory: { ...variableValues.categoryData } },
        });
    });
    test("returnAllCategories returns all existing categories", async () => {
        const categories = [];
        const categoryResponses = testHelpers_1.exampleCategories.map((category) => (0, test_utils_1.callQuery)({
            source: CreateCategory,
            variableValues: category,
            contextValue: {
                space,
            },
        })
            .then((response) => categories.push(response.data?.createCategory))
            .catch((e) => console.log(e)));
        await Promise.all(categoryResponses);
        const response = await (0, test_utils_1.callQuery)({
            source: ReturnAllCategories,
            contextValue: {
                space,
            },
        });
        categories.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
        const allCategories = response.data?.returnAllCategories;
        allCategories.sort((cat1, cat2) => cat1.name.localeCompare(cat2.name));
        expect(allCategories).toEqual(categories);
    });
    test("updateCategory returns the correct category with new details", async () => {
        const createResponse = await (0, test_utils_1.callQuery)({
            source: CreateCategory,
            variableValues: testHelpers_1.exampleCategories[0],
            contextValue: {
                space,
            },
        });
        const updateValues = {
            id: createResponse.data?.createCategory.id,
            data: {
                type: "Expense",
                name: "Expense test",
                monthlyBudget: 1234,
                description: "Expense test",
                icon: "random",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: UpdateCategory,
            variableValues: updateValues,
            contextValue: {
                space,
            },
        });
        expect(updateResponse).toMatchObject({
            data: { updateCategory: { ...updateValues.data } },
        });
    });
    test("updateCategory returns an error if no category exists with given ID", async () => {
        await (0, test_utils_1.callQuery)({
            source: CreateCategory,
            variableValues: testHelpers_1.exampleCategories[0],
            contextValue: {
                space,
            },
        });
        const updateValues = {
            id: "61c7f4ffedaa15c81ffd55c9",
            data: {
                type: "Expense",
                name: "Expense test",
                monthlyBudget: 1234,
                description: "Expense test",
                icon: "random",
            },
        };
        const updateResponse = await (0, test_utils_1.callQuery)({
            source: UpdateCategory,
            variableValues: updateValues,
            contextValue: {
                space,
            },
        });
        expect(updateResponse).toMatchObject({
            data: null,
            errors: [
                {
                    message: "Invalid category id",
                },
            ],
        });
    });
    test("deleteCategory returns true when called with a category ID and", async () => {
        const createResponse = await (0, test_utils_1.callQuery)({
            source: CreateCategory,
            variableValues: testHelpers_1.exampleCategories[0],
            contextValue: {
                space,
            },
        });
        const deleteResponse = await (0, test_utils_1.callQuery)({
            source: DeleteCategory,
            variableValues: {
                id: createResponse.data?.createCategory.id,
            },
            contextValue: {
                space,
            },
        });
        expect(deleteResponse).toMatchObject({
            data: { deleteCategory: true },
        });
    });
});
