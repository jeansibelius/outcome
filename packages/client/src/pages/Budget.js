"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const client_1 = require("@apollo/client");
const queries_1 = require("../queries");
const types_1 = require("../types");
const semantic_ui_react_1 = require("semantic-ui-react");
const CategoryModal_1 = __importDefault(require("../components/CategoryModal"));
const CategoryTable_1 = __importDefault(require("../components/CategoryTable"));
const utils_1 = require("../utils");
const DashboardDataPane_1 = __importDefault(require("../components/DashboardDataPane"));
const CustomResponsivePie_1 = __importDefault(require("../components/charts/CustomResponsivePie"));
const data_1 = require("../utils/data");
const Categories = () => {
    const getCategories = (0, client_1.useQuery)(queries_1.ALL_CATEGORIES);
    const [modalOpen, setModalOpen] = react_1.default.useState(false);
    const [updateCategoryValues, setUpdateCategoryValues] = (0, react_1.useState)(undefined);
    const [categoryChartData, setCategoryChartData] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (getCategories.data) {
            const categories = getCategories.data.returnAllCategories;
            const formattedChartData = (0, data_1.categoriesToIdAndValue)(categories);
            setCategoryChartData(formattedChartData);
        }
    }, [getCategories.data]);
    const openUpdateCategoryModal = (data) => {
        setUpdateCategoryValues(data);
        setModalOpen(true);
    };
    const closeCategoryModal = () => {
        setModalOpen(false);
    };
    if (!(0, utils_1.IsLoggedIn)()) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Please login." });
    }
    if (getCategories.loading || !categoryChartData)
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    const panes = Object.values(types_1.IncomeExpenseType).map((type) => ({
        menuItem: { key: type, content: `${type}s` },
        render: () => ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Tab.Pane, { children: [(0, jsx_runtime_1.jsx)(DashboardDataPane_1.default, { children: (0, jsx_runtime_1.jsx)(CustomResponsivePie_1.default, { data: categoryChartData.filter((cat) => cat.type === type) }) }), (0, jsx_runtime_1.jsx)(CategoryTable_1.default, { type: type, openUpdateCategoryModal: openUpdateCategoryModal })] }, type)),
    }));
    const totals = categoryChartData.reduce((arr, cat) => {
        const index = cat.type === "Expense" ? 0 : 1;
        let sum = arr[index] ? arr[index]["total"] : 0;
        arr[index] = { total: sum + cat.value, type: cat.type };
        return arr;
    }, []);
    const balance = totals.reduce((balance, totals) => totals.type === types_1.IncomeExpenseType.Expense
        ? balance - totals.total
        : balance + totals.total, 0);
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Container, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Statistic.Group, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Statistic, { color: balance >= 0 ? "teal" : "pink", style: { margin: "0 auto 2em" }, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Statistic.Label, { children: "Monthly balance" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Statistic.Value, { children: balance })] }) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Statistic.Group, { widths: 2, style: { marginBottom: "2em" }, children: totals.map((obj) => ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Statistic, { size: "mini", children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Statistic.Value, { children: obj.total }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Statistic.Label, { children: [obj.type, "s"] })] }, obj.type))) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Tab, { menu: { pointing: true }, panes: panes }), (0, jsx_runtime_1.jsx)(CategoryModal_1.default, { modalOpen: modalOpen, onClose: closeCategoryModal, isUpdatingCategory: updateCategoryValues ? true : false, updateCategoryValues: updateCategoryValues })] }));
};
exports.default = Categories;
