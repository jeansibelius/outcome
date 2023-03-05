"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectToDB_1 = __importDefault(require("../utils/connectToDB"));
const test_utils_1 = require("../test-utils");
const queries_1 = require("@packages/client/src/queries");
const testHelpers_1 = require("../test-utils/testHelpers");
let dbConnection;
const Login = queries_1.login;
beforeAll(async () => {
    dbConnection = await (0, connectToDB_1.default)();
});
beforeEach(async () => {
    await (0, test_utils_1.resetDB)();
    await (0, test_utils_1.createDefaultUserAndSpace)();
});
afterAll(async () => {
    await dbConnection?.close();
    console.log("closed db connection");
});
describe("When resolving login", () => {
    test("the login mutation returns a token and user with correct details", async () => {
        const response = await (0, test_utils_1.callQuery)({
            source: Login,
            variableValues: {
                email: testHelpers_1.exampleUser.email,
                password: testHelpers_1.exampleUser.password,
            },
        });
        expect(response.errors).toBeUndefined();
        expect(response.data?.login.token).toBeDefined();
        expect(response).toMatchObject({
            data: {
                login: {
                    user: {
                        first_name: testHelpers_1.exampleUser.first_name,
                        last_name: testHelpers_1.exampleUser.last_name,
                        spaces: [
                            {
                                name: "Test Space",
                            },
                        ],
                    },
                },
            },
        });
    });
    test("the mutation returns an error, when email or password is wrong", async () => {
        const response = await (0, test_utils_1.callQuery)({
            source: Login,
            variableValues: {
                email: testHelpers_1.exampleUser.email,
                password: "wrongpswd",
            },
        });
        expect(JSON.stringify(response.errors)).toContain("Wrong email or password.");
    });
    test("the mutation returns the default error even, when user doesn't exist", async () => {
        const response = await (0, test_utils_1.callQuery)({
            source: Login,
            variableValues: {
                email: "nosuchuser@test.com",
                password: testHelpers_1.exampleUser.password,
            },
        });
        expect(JSON.stringify(response.errors)).toContain("Wrong email or password.");
    });
});
