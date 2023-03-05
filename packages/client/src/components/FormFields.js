"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySelect = exports.RadioGroup = exports.InputField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const formik_1 = require("formik");
const react_1 = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const queries_1 = require("../queries");
// TODO check if it would be possible to make this better by
// https://formik.org/docs/api/useField#fieldinputpropsvalue
const InputField = ({ field, label, placeholder, type, }) => {
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Form.Field, { children: [(0, jsx_runtime_1.jsx)("label", { children: label }), (0, jsx_runtime_1.jsx)(formik_1.Field, { type: type, placeholder: placeholder, ...field }), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: field.name })] }));
};
exports.InputField = InputField;
const RadioGroup = ({ name, label, elements }) => {
    const fieldName = { name };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = (0, formik_1.useField)(fieldName);
    const onChange = (_event, data) => {
        helpers.setTouched(true);
        helpers.setValue(data.value);
    };
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Form.Group, { inline: true, "aria-labelledby": field.name + "-group", children: [(0, jsx_runtime_1.jsx)("label", { children: label }), elements.map((element) => ((0, jsx_runtime_1.jsx)("label", { children: (0, jsx_runtime_1.jsx)(formik_1.Field, { type: "radio", name: field.name, value: element, label: element, error: meta.error ? true : false, component: semantic_ui_react_1.Form.Radio, checked: meta.value === element, onChange: onChange }) }, element))), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: field.name })] }));
};
exports.RadioGroup = RadioGroup;
const CategorySelect = ({ entryType }) => {
    const fieldName = "category";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_field, meta, helpers] = (0, formik_1.useField)(fieldName);
    const getCategories = (0, client_1.useQuery)(queries_1.ALL_CATEGORIES);
    const [categories, setCategories] = (0, react_1.useState)(undefined);
    const [stateOptions, setStateOptions] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (getCategories.data) {
            setCategories(getCategories.data.returnAllCategories);
        }
    }, [getCategories]);
    (0, react_1.useEffect)(() => {
        if (categories) {
            setStateOptions(categories
                .filter((category) => category.type === entryType)
                .map((category) => ({
                key: category.id,
                text: category.name,
                value: category.id,
                description: category.description,
                icon: category.icon,
            })));
        }
    }, [categories, entryType]);
    const onChange = (_event, data) => {
        helpers.setTouched(true);
        helpers.setValue(data.value);
    };
    if (!stateOptions) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Form.Field, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Category" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Dropdown, { fluid: true, search: true, selection: true, error: meta.error ? true : false, options: stateOptions || [], value: meta.value ? meta.value : undefined, onChange: onChange, loading: getCategories.loading ? true : false }), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: fieldName })] }));
};
exports.CategorySelect = CategorySelect;
