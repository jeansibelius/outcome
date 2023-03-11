"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const CategoryFilter = ({ categories, filterView, }) => {
    const [value, setValue] = react_1.default.useState([]);
    const options = categories.reduce((arr, category) => [
        ...arr,
        {
            key: category.id,
            text: category.name,
            value: category.id,
            icon: category.icon,
        },
    ], []);
    const renderLabel = (label) => ({
        content: label.text,
        icon: "check circle",
    });
    const handleChange = (_e, data) => {
        setValue(data.value);
        filterView(data.value);
    };
    if (categories.length > 0) {
        return ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Dropdown, { placeholder: "Filter categories", fluid: true, multiple: true, value: value, selection: true, options: options, onChange: (event, object) => handleChange(event, object), renderLabel: renderLabel }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
};
exports.default = CategoryFilter;
