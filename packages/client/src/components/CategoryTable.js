"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const react_1 = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const queries_1 = require("../queries");
const CategoryTable = ({ type, openUpdateCategoryModal }) => {
    const getCategories = (0, client_1.useQuery)(queries_1.ALL_CATEGORIES);
    const [categories, setCategories] = (0, react_1.useState)(undefined);
    (0, react_1.useEffect)(() => {
        if (getCategories.data) {
            setCategories(getCategories.data.returnAllCategories);
        }
    }, [getCategories.data]);
    if (getCategories.loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading" });
    }
    if (getCategories.error) {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "Error loading categories." }), (0, jsx_runtime_1.jsx)("i", { children: getCategories.error.message })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table, { selectable: true, color: type === "Expense" ? "orange" : "green", children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Header, { fullWidth: true, children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Row, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { width: 2, children: "Name" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { width: 6, children: "Description" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { width: 2, children: "Monthly budget" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.HeaderCell, { width: 1 })] }) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Body, { children: categories ? (categories
                    .filter((category) => category.type === type)
                    .map((category) => ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Row, { onClick: () => openUpdateCategoryModal(category), children: [(0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Cell, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { className: category.icon }), category.name] }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: category.description }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: category.monthlyBudget }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Cell, { children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { as: semantic_ui_react_1.Button, icon: "pencil", size: "mini", style: { margin: "2px 0" }, onClick: () => openUpdateCategoryModal(category) }) })] }, category.id)))) : ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Row, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Cell, { colSpan: "3", children: ["No ", type, " categories defined yet."] }) })) }), categories ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Table.Footer, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.Row, { children: [(0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.HeaderCell, { colSpan: "2", children: [categories.filter((category) => category.type === type).length, " categories"] }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Table.HeaderCell, { colSpan: "2", children: ["Total:", " ", categories
                                    .filter((category) => category.type === type)
                                    .reduce((sum, cat) => (cat.monthlyBudget ? sum + cat.monthlyBudget : sum), 0)] })] }) })) : null] }));
};
exports.default = CategoryTable;
