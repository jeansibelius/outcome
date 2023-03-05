"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetPath = exports.entriesPath = exports.dashboardPath = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const semantic_ui_react_1 = require("semantic-ui-react");
const utils_1 = require("../utils");
const CustomMenuItemWithLink_1 = __importDefault(require("./CustomMenuItemWithLink"));
const DateFilter_1 = __importDefault(require("./DateFilter"));
exports.dashboardPath = "dashboard";
exports.entriesPath = "entries";
exports.budgetPath = "budget";
const BottomNavigation = ({ openEntryModal, openCategoryModal, openLoginModal, }) => {
    const location = (0, react_router_dom_1.useLocation)();
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            position: "fixed",
            padding: "0 1em",
            bottom: "2em",
            width: "100%",
        }, className: "drop-shadow-lg", children: (0, utils_1.IsLoggedIn)() ? ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Grid, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Row, { children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Column, { floated: "right", children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Menu, { floated: "right", vertical: true, widths: 1, size: "mini", icon: "labeled", borderless: true, children: [(0, jsx_runtime_1.jsxs)(CustomMenuItemWithLink_1.default, { to: "/", children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: exports.dashboardPath }), "Dashboard"] }), (0, jsx_runtime_1.jsxs)(CustomMenuItemWithLink_1.default, { to: exports.entriesPath, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "list ul" }), "Entries"] })] }) }) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Grid.Row, { columns: "equal", children: [openEntryModal &&
                            (location.pathname === `/${exports.entriesPath}` ||
                                location.pathname === "/") ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Column, { floated: "left", children: (0, jsx_runtime_1.jsx)(DateFilter_1.default, {}) })) : null, (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Grid.Column, { children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu, { inverted: true, size: "mini", secondary: true, children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu.Item, { position: "right", fitted: true, children: openEntryModal &&
                                        (location.pathname === `/${exports.entriesPath}` ||
                                            location.pathname === "/account" ||
                                            location.pathname === "/") ? ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Button, { circular: true, size: "small", primary: true, onClick: () => openEntryModal(), children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "plus" }), "New entry"] })) : openCategoryModal &&
                                        location.pathname === `/${exports.budgetPath}` ? ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Button, { circular: true, size: "small", primary: true, onClick: () => openCategoryModal(), children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "plus" }), "New category"] })) : null }) }) })] })] })) : ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu, { fluid: true, widths: 4, size: "mini", icon: "labeled", borderless: true, children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Menu.Item, { style: { width: "100%" }, onClick: () => openLoginModal(), children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "user" }), "Login"] }) })) }));
};
exports.default = BottomNavigation;
