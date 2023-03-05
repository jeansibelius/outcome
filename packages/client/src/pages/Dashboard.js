"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const react_1 = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const CustomHorizontalBar_1 = __importDefault(require("../components/charts/CustomHorizontalBar"));
const CustomResponsivePie_1 = __importDefault(require("../components/charts/CustomResponsivePie"));
const DashboardDataPane_1 = __importDefault(require("../components/DashboardDataPane"));
const SpendByCategoryTable_1 = __importDefault(require("../components/SpendByCategoryTable"));
const queries_1 = require("../queries");
const types_1 = require("../types");
const data_1 = require("../utils/data");
const dates_1 = require("../utils/dates");
const Entries_1 = require("./Entries");
const Dashboard = () => {
    const getEntries = (0, client_1.useQuery)(queries_1.ALL_ENTRIES);
    const getCategories = (0, client_1.useQuery)(queries_1.ALL_CATEGORIES);
    const [incomeExpenseData, setIncomeExpenseData] = (0, react_1.useState)();
    const [incomeExpenseDataKeys, setIncomeExpenseDataKeys] = (0, react_1.useState)();
    const [categoryChartData, setCategoryChartData] = (0, react_1.useState)();
    const [expensesByCategory, setExpensesByCategory] = (0, react_1.useState)();
    const [incomesByCategory, setIncomesByCategory] = (0, react_1.useState)();
    const currentViewDateRange = (0, client_1.useQuery)(queries_1.GET_CURRENT_VIEW_RANGE);
    const startInit = (0, dates_1.getYearMonth)({});
    const endInit = (0, dates_1.getYearMonth)({ addMonth: 1 });
    const initDate = { start: startInit, end: endInit };
    const [dateFilter, setDateFilter] = (0, react_1.useState)(initDate);
    (0, react_1.useEffect)(() => {
        setDateFilter(currentViewDateRange.data.currentViewMonth);
    }, [currentViewDateRange]);
    (0, react_1.useEffect)(() => {
        if (getEntries.data) {
            const entries = getEntries.data.returnAllEntries.filter((entry) => {
                const entryDate = new Date(entry.date);
                return entryDate >= dateFilter.start && entryDate < dateFilter.end;
            });
            const formattedChartDataKeys = (0, data_1.entriesToIncomeAndExpenseSumBarDataKeys)(entries);
            const formattedChartData = (0, data_1.entriesToIncomeAndExpenseSumBarData)(entries, formattedChartDataKeys);
            setIncomeExpenseData(formattedChartData);
            setIncomeExpenseDataKeys(formattedChartDataKeys);
            const entriesByCategoryFormatted = (0, data_1.entriesByCategoryToIdAndValue)(entries);
            setExpensesByCategory(entriesByCategoryFormatted.filter((entry) => entry.type === types_1.IncomeExpenseType.Expense));
            setIncomesByCategory(entriesByCategoryFormatted.filter((entry) => entry.type === types_1.IncomeExpenseType.Income));
        }
    }, [getEntries.data, dateFilter]);
    (0, react_1.useEffect)(() => {
        if (getCategories.data) {
            const categories = getCategories.data.returnAllCategories;
            const formattedChartData = (0, data_1.categoriesToIdAndValue)(categories);
            setCategoryChartData(formattedChartData);
        }
    }, [getCategories.data]);
    if (getCategories.loading ||
        getEntries.loading ||
        !incomeExpenseData ||
        !incomeExpenseDataKeys ||
        !categoryChartData ||
        !expensesByCategory ||
        !incomesByCategory)
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    if (getEntries.data.returnAllEntries.length === 0)
        return (0, jsx_runtime_1.jsx)(Entries_1.NoEntries, {});
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Grid, { stackable: true, columns: 2, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Column, { children: (0, jsx_runtime_1.jsx)(SpendByCategoryTable_1.default, { categoryData: categoryChartData.filter((category) => category.type === types_1.IncomeExpenseType.Expense), entrySumData: expensesByCategory }) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Grid.Column, { children: [(0, jsx_runtime_1.jsx)(DashboardDataPane_1.default, { title: "Income vs. Expenses", children: (0, jsx_runtime_1.jsx)(CustomHorizontalBar_1.default, { data: incomeExpenseData, keys: incomeExpenseDataKeys }) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Header, { sub: true, textAlign: "center", children: ["Balance:", " ", incomeExpenseData.reduce((sum, entry) => entry.type === types_1.IncomeExpenseType.Income
                                    ? (sum += entry.total)
                                    : (sum -= entry.total), 0)] })] }), expensesByCategory.length > 0 ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Column, { children: (0, jsx_runtime_1.jsx)(DashboardDataPane_1.default, { title: "Expenses by category", children: (0, jsx_runtime_1.jsx)(CustomResponsivePie_1.default, { data: expensesByCategory }) }) })) : null, incomesByCategory.length > 0 ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Column, { children: (0, jsx_runtime_1.jsx)(DashboardDataPane_1.default, { title: "Incomes by category", children: (0, jsx_runtime_1.jsx)(CustomResponsivePie_1.default, { data: incomesByCategory }) }) })) : null] }) }));
};
exports.default = Dashboard;
