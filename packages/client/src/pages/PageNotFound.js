"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const semantic_ui_react_1 = require("semantic-ui-react");
const PageNotFound = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl", children: "Sorry, no content here..." }), (0, jsx_runtime_1.jsx)("p", { children: "You used a broken link or typed something funny in the address bar. Please check!" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Divider, {}), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Button, { as: react_router_dom_1.Link, to: "/", children: "Go to the home page" })] }));
};
exports.default = PageNotFound;
