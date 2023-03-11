"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryAsAFeedEvent = exports.EntryAsACard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const semantic_ui_react_1 = require("semantic-ui-react");
const dates_1 = require("../utils/dates");
const EntryAsACard = ({ entry, updateEntry }) => ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Card, { color: entry.type === "Expense" ? "orange" : "green", children: [(0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Card.Content, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { floated: "right", as: semantic_ui_react_1.Button, icon: "pencil", size: "mini", onClick: () => updateEntry(entry) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Card.Header, { children: ["\u00A5 ", entry.amount] }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Card.Meta, { children: entry.category ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [entry.category.icon ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { className: entry.category.icon })) : null, (0, jsx_runtime_1.jsx)("span", { children: entry.category.name })] })) : null })] }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Card.Content, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Header, { as: "h4", children: entry.name }), (0, jsx_runtime_1.jsx)("span", { children: entry.description })] }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Card.Content, { extra: true, children: [(0, jsx_runtime_1.jsx)("span", { className: "float-left", children: (0, dates_1.getYearMonthDay)(entry.date) }), (0, jsx_runtime_1.jsx)("span", { className: "float-right", children: entry.type })] })] }));
exports.EntryAsACard = EntryAsACard;
const EntryAsAFeedEvent = ({ entry, updateEntry }) => {
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Feed.Event, { style: { margin: "0 0 0.7em" }, onClick: () => updateEntry(entry), children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Feed.Label, { children: entry.category?.icon ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { circular: true, inverted: true, bordered: true, color: entry.type === "Expense" ? "pink" : "teal", className: entry.category.icon, style: { fontSize: "1em" } })) : null }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Feed.Content, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Feed.Date, {}), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Feed.Summary, { children: [(0, jsx_runtime_1.jsx)("strong", { style: entry.type === "Expense"
                                    ? { color: "#e03997" }
                                    : { color: "teal" }, children: entry.type === "Expense" ? `-${entry.amount}` : `${entry.amount}` }), entry.name, (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Feed.Date, { children: entry.category ? entry.category.name : (0, jsx_runtime_1.jsx)("i", { children: "Not categorised" }) })] }), entry.description ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Feed.Extra, { children: entry.description })) : null, (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Feed.Meta, { children: [(0, dates_1.getYearMonthDay)(entry.date), " \u00B7 ", entry.user.first_name] })] })] }));
};
exports.EntryAsAFeedEvent = EntryAsAFeedEvent;
const Entry = (props) => {
    return (0, jsx_runtime_1.jsx)(exports.EntryAsAFeedEvent, { ...props });
};
exports.default = Entry;
