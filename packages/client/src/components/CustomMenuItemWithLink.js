"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const semantic_ui_react_1 = require("semantic-ui-react");
const CustomMenuItemWithLink = ({ children, to }) => {
    let resolved = (0, react_router_dom_1.useResolvedPath)(to);
    let match = (0, react_router_dom_1.useMatch)({ path: resolved.pathname, end: true });
    return ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu.Item, { as: react_router_dom_1.Link, active: !!match, to: to, children: children }));
};
exports.default = CustomMenuItemWithLink;
