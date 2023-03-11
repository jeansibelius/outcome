"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const semantic_ui_react_1 = require("semantic-ui-react");
const logo_1 = require("../logo");
const utils_1 = require("../utils");
const Dashboard_1 = __importDefault(require("./Dashboard"));
const FrontPage = () => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, utils_1.IsLoggedIn)() ? ((0, jsx_runtime_1.jsx)(Dashboard_1.default, {})) : ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Container, { textAlign: "center", children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Image, { src: logo_1.logo, centered: true, size: "large" }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Header, { as: "h2", children: ["Welcome to Outcome", (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Header.Subheader, { children: ["A simple app to track", (0, jsx_runtime_1.jsx)("br", {}), "the outcome of your income."] })] })] })) }));
};
exports.default = FrontPage;
