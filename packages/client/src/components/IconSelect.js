"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const formik_1 = require("formik");
const react_1 = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const icons_1 = require("../utils/icons");
const IconSelect = () => {
    const fieldName = "icon";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, _meta, helpers] = (0, formik_1.useField)(fieldName);
    const icons = (0, react_1.useMemo)(() => icons_1.ICONS.map((icon) => ({
        key: icon,
        text: icon,
        value: icon,
        icon: icon,
    })), []);
    const onChange = (_event, data) => {
        helpers.setTouched(true);
        helpers.setValue(data.value);
    };
    if (!icons) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Form.Field, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Icon" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Dropdown, { fluid: true, search: true, selection: true, clearable: true, value: field.value, options: icons, onChange: onChange, loading: !icons ? true : false }), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: fieldName })] }));
};
exports.default = (0, react_1.memo)(IconSelect);
