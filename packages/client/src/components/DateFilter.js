"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const cache_1 = require("../cache");
const dates_1 = require("../utils/dates");
const DateFilterInput = ({ title, handleDateFilterChange, currentValue, min, max, }) => {
    const isStart = title === "Start";
    const minString = min ? (0, dates_1.getYearMonthDay)(min) : "";
    const maxString = max ? (0, dates_1.getYearMonthDay)(max) : "";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col mb-2", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: title + "DateInput", className: "font-bold mb-1", children: title }), (0, jsx_runtime_1.jsx)("input", { id: title + "DateInput", type: "date", onChange: (event) => handleDateFilterChange(event, isStart), value: (0, dates_1.getYearMonthDay)(currentValue), min: minString, max: maxString, className: "p-2 border rounded-md border-slate-300" })] }));
};
const DateFilter = () => {
    const today = new Date();
    const startInit = new Date(today.getFullYear(), today.getMonth());
    const endInit = new Date(today.getFullYear(), today.getMonth() + 1);
    const initDate = { start: startInit, end: endInit };
    const [dateFilter, setDateFilter] = (0, react_1.useState)(initDate);
    const [popupIsOpen, setPopupIsOpen] = (0, react_1.useState)(false);
    const prevMonth = () => {
        const newStart = new Date(dateFilter.start.getFullYear(), dateFilter.start.getMonth() - 1);
        const newEnd = new Date(dateFilter.end.getFullYear(), dateFilter.end.getMonth() - 1);
        const newDate = { start: newStart, end: newEnd };
        (0, cache_1.currentViewDateRangeVar)(newDate);
        setDateFilter(newDate);
    };
    const nextMonth = () => {
        const newStart = new Date(dateFilter.start.getFullYear(), dateFilter.start.getMonth() + 1);
        const newEnd = new Date(dateFilter.end.getFullYear(), dateFilter.end.getMonth() + 1);
        const newDate = { start: newStart, end: newEnd };
        (0, cache_1.currentViewDateRangeVar)(newDate);
        setDateFilter(newDate);
    };
    const handleDateFilterChange = (event, isStart) => {
        if (isStart) {
            const newStart = new Date(event.target.value);
            const newDate = { start: newStart, end: dateFilter.end };
            (0, cache_1.currentViewDateRangeVar)(newDate);
            setDateFilter(newDate);
        }
        else {
            const newEnd = new Date(event.target.value);
            const newDate = { start: dateFilter.start, end: newEnd };
            (0, cache_1.currentViewDateRangeVar)(newDate);
            setDateFilter(newDate);
        }
        event.target.blur(); // Needed for mobile browsers to re-enable the date selector
    };
    const resetMonth = () => {
        (0, cache_1.currentViewDateRangeVar)(initDate);
        setDateFilter(initDate);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Menu, { size: "mini", borderless: true, compact: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu.Item, { fitted: true, children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Button, { attached: "left", size: "mini", onClick: () => prevMonth(), children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "caret left", inverted: true, color: "black" }) }) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Popup, { trigger: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Button, { as: semantic_ui_react_1.Menu.Item, onClick: () => setPopupIsOpen(true), size: "mini", fitted: true, children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Header, { as: "h4", style: { padding: "0 1em" }, children: [dateFilter.start.toLocaleString("default", {
                                    month: "short",
                                    year: "2-digit",
                                }), dateFilter.end.valueOf() - dateFilter.start.valueOf() >
                                    1000 * 60 * 60 * 24 * 31 // Milliseconds to 31 days
                                    ? "-"
                                    : ""] }) }), position: "top center", open: popupIsOpen, hideOnScroll: true, children: [(0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)(DateFilterInput, { title: "Start", handleDateFilterChange: handleDateFilterChange, currentValue: dateFilter.start, max: dateFilter.end }), (0, jsx_runtime_1.jsx)(DateFilterInput, { title: "End", handleDateFilterChange: handleDateFilterChange, currentValue: dateFilter.end, min: dateFilter.start })] }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Divider, {}), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Button.Group, { widths: 2, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Button, { basic: true, onClick: () => resetMonth(), children: "Reset" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Button, { primary: true, onClick: () => setPopupIsOpen(false), children: "Ok" })] })] }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu.Item, { fitted: true, children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Button, { attached: "right", size: "mini", onClick: () => nextMonth(), children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "caret right" }) }) })] }) }));
};
exports.default = DateFilter;
