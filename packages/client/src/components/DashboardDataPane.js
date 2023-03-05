"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const semantic_ui_react_1 = require("semantic-ui-react");
const DashboardDataPane = ({ title, children }) => {
    const style = { marginBottom: "10vh", width: "100%", height: "30vh" };
    return ((0, jsx_runtime_1.jsxs)("div", { style: style, children: [title && (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Header, { as: "h3", children: title }), children] }));
};
exports.default = DashboardDataPane;
