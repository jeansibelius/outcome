"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = __importDefault(require("lodash"));
const react_1 = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const dates_1 = require("../utils/dates");
const getWeeklyBudget = (budget) => {
    const today = new Date();
    const weekDivider = (0, dates_1.getCountOfDaysInMonth)(today.getFullYear(), today.getMonth()) / 7;
    return Math.floor(budget / weekDivider);
};
const mapEntriesToCategories = ({ categoryData, entrySumData, }) => {
    const data = categoryData.map((category) => {
        const expenseValue = entrySumData.find((data) => data.id === category.id)?.value || 0;
        const remainingBudget = expenseValue
            ? category.value - expenseValue
            : category.value;
        return {
            name: category.id,
            budget: category.value,
            weeklyBudget: getWeeklyBudget(category.value),
            spend: expenseValue,
            remainingBudget: remainingBudget,
            remainingWeeklyBudget: getWeeklyBudget(remainingBudget),
        };
    });
    const uncategorised = entrySumData.find((sum) => sum.id === "uncategorised");
    if (uncategorised) {
        data.push({
            name: "Uncategorised",
            budget: 0,
            weeklyBudget: 0,
            spend: uncategorised.value,
            remainingBudget: -uncategorised.value,
            remainingWeeklyBudget: getWeeklyBudget(-uncategorised.value),
        });
    }
    return data;
};
var SortActionKind;
(function (SortActionKind) {
    SortActionKind["UPDATE_DATA"] = "UPDATE_DATA";
    SortActionKind["CHANGE_SORT"] = "CHANGE_SORT";
})(SortActionKind || (SortActionKind = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ascending"] = "ascending";
    SortDirection["descending"] = "descending";
})(SortDirection || (SortDirection = {}));
function tableReducer(state, action) {
    switch (action.type) {
        case "UPDATE_DATA":
            const sortedData = lodash_1.default.sortBy(action.data, [state.column]);
            return {
                ...state,
                data: state.direction === "ascending" ? sortedData : sortedData.reverse(),
            };
        case "CHANGE_SORT":
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction: state.direction === "ascending"
                        ? SortDirection.descending
                        : SortDirection.ascending,
                };
            }
            return {
                column: action.column,
                data: lodash_1.default.sortBy(state.data, [action.column]),
                direction: state.direction,
            };
        default:
            throw new Error();
    }
}
const SpendByCategoryTable = ({ categoryData, entrySumData, }) => {
    const tableData = mapEntriesToCategories({
        categoryData,
        entrySumData,
    });
    const initialState = {
        column: "name",
        data: tableData,
        direction: SortDirection.ascending,
    };
    const [state, dispatch] = (0, react_1.useReducer)(tableReducer, initialState);
    const { column, data, direction } = state;
    (0, react_1.useEffect)(() => {
        dispatch({
            type: SortActionKind.UPDATE_DATA,
            column: state.column || "name",
            data: mapEntriesToCategories({ categoryData, entrySumData }),
        });
    }, [categoryData, entrySumData, state.column]);
    const categoriesTotal = categoryData.reduce((sum, cat) => (sum += cat.value), 0);
    const entriesTotal = entrySumData.reduce((sum, expense) => (sum += expense.value), 0);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Header, { as: "h3", children: "Spend by category" }), (0, jsx_runtime_1.jsx)("div", { style: { overflowX: "scroll" }, children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table, { basic: "very", sortable: true, unstackable: true, singleLine: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Header, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { sorted: column === "name" ? direction : undefined, onClick: () => dispatch({ type: SortActionKind.CHANGE_SORT, column: "name" }), children: "Expenses" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { sorted: column === "budget" ? direction : undefined, onClick: () => dispatch({
                                            type: SortActionKind.CHANGE_SORT,
                                            column: "budget",
                                        }), children: "Budget" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { sorted: column === "weeklyBudget" ? direction : undefined, onClick: () => dispatch({
                                            type: SortActionKind.CHANGE_SORT,
                                            column: "weeklyBudget",
                                        }), children: "/ week" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { sorted: column === "spend" ? direction : undefined, onClick: () => dispatch({
                                            type: SortActionKind.CHANGE_SORT,
                                            column: "spend",
                                        }), children: "Spent" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { sorted: column === "remainingBudget" ? direction : undefined, onClick: () => dispatch({
                                            type: SortActionKind.CHANGE_SORT,
                                            column: "remainingBudget",
                                        }), children: "+/-" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { sorted: column === "remainingWeeklyBudget" ? direction : undefined, onClick: () => dispatch({
                                            type: SortActionKind.CHANGE_SORT,
                                            column: "remainingWeeklyBudget",
                                        }), children: "/ week" })] }) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Body, { children: data.map(({ name, budget, weeklyBudget, spend, remainingBudget, remainingWeeklyBudget, }) => {
                                return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Row, { negative: remainingBudget < 0 ? true : false, warning: name === "Uncategorised" ||
                                        (remainingBudget > 0 && remainingBudget < budget / 5)
                                        ? true
                                        : false, positive: remainingBudget > budget / 2 ? true : false, children: [(0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Cell, { children: [name === "Uncategorised" ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "attention" })) : null, name] }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: budget }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: weeklyBudget }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: spend }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: remainingBudget }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: remainingWeeklyBudget })] }, name));
                            }) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Footer, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { children: "Total" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { children: categoriesTotal }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { children: getWeeklyBudget(categoriesTotal) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { children: entriesTotal }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { children: categoriesTotal - entriesTotal }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { children: getWeeklyBudget(categoriesTotal - entriesTotal) })] }) })] }) })] }));
};
exports.default = SpendByCategoryTable;
