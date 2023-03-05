"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerLoginForm = exports.LoginFormValidationSchema = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Yup = __importStar(require("yup"));
const formik_1 = require("formik");
const semantic_ui_react_1 = require("semantic-ui-react");
const FormFields_1 = require("./FormFields");
exports.LoginFormValidationSchema = Yup.object().shape({
    email: Yup.string().email("Please use a valid email").required(),
    password: Yup.string().min(4, "Too short").max(255, "Too long").required(),
});
const InnerLoginForm = (props) => {
    const { handleSubmit, isValid, isSubmitting } = props;
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Form, { className: "w-full form ui", onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)(formik_1.Field, { name: "email", label: "Email", type: "email", component: FormFields_1.InputField }), (0, jsx_runtime_1.jsx)(formik_1.Field, { name: "password", label: "Password", type: "password", component: FormFields_1.InputField }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: !isValid || isSubmitting, className: "w-full p-4 px-8 text-lg font-bold text-green-900 bg-green-300 rounded-lg drop-shadow-md hover:drop-shadow-lg hover:bg-green-400 disabled:opacity-75 disabled:hover:bg-slate-300 disabled:bg-slate-300 disabled:text-white disabled:drop-shadow-none", children: "Submit" })] }));
};
exports.InnerLoginForm = InnerLoginForm;
let defaultValues = {
    email: "",
    password: "",
};
if (process.env.NODE_ENV !== "production") {
    defaultValues = {
        email: "hari.seldon@foundation.org",
        password: "test",
    };
}
const LoginForm = (0, formik_1.withFormik)({
    // Transform outer props into form values
    mapPropsToValues: () => {
        return {
            email: defaultValues.email,
            password: defaultValues.password,
        };
    },
    validationSchema: exports.LoginFormValidationSchema,
    handleSubmit: async ({ email, password }, { props, resetForm }) => {
        // do submitting things
        try {
            props.onSubmit(email, password);
            resetForm();
        }
        catch (error) {
            console.log("handleSubmit error", error);
        }
    },
    displayName: "LoginForm",
})(exports.InnerLoginForm);
exports.default = LoginForm;
