"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeExpenseType = void 0;
const type_graphql_1 = require("type-graphql");
var IncomeExpenseType;
(function (IncomeExpenseType) {
    IncomeExpenseType["Income"] = "Income";
    IncomeExpenseType["Expense"] = "Expense";
})(IncomeExpenseType = exports.IncomeExpenseType || (exports.IncomeExpenseType = {}));
(0, type_graphql_1.registerEnumType)(IncomeExpenseType, {
    name: "IncomeExpenseType",
    description: "Can be either income or expense.",
});
