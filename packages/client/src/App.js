"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Entries_1 = __importDefault(require("./pages/Entries"));
const Budget_1 = __importDefault(require("./pages/Budget"));
const Layout_1 = __importDefault(require("./pages/Layout"));
const Account_1 = __importDefault(require("./pages/Account"));
const FrontPage_1 = __importDefault(require("./pages/FrontPage"));
const PageNotFound_1 = __importDefault(require("./pages/PageNotFound"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Layout_1.default, {}), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(FrontPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "entries", element: (0, jsx_runtime_1.jsx)(Entries_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "budget", element: (0, jsx_runtime_1.jsx)(Budget_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "account", element: (0, jsx_runtime_1.jsx)(Account_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(PageNotFound_1.default, {}) })] }) }) }));
};
exports.default = App;
