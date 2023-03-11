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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidationSchema = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Yup = __importStar(require("yup"));
const formik_1 = require("formik");
const semantic_ui_react_1 = require("semantic-ui-react");
const types_1 = require("../types");
const FormFields_1 = require("./FormFields");
const IconSelect_1 = __importDefault(require("./IconSelect"));
exports.CategoryValidationSchema = Yup.object().shape({
    type: Yup.string().required(),
    name: Yup.string().min(1, "Too short").max(255, "Too long").required(),
    monthlyBudget: Yup.number().min(0),
    description: Yup.string().max(255, "Too long"),
    category: Yup.string(),
    icon: Yup.string(),
});
const CategoryForm = (props) => {
    const { dirty, isValid, isSubmitting, handleSubmit } = props;
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Form, { className: "w-full form ui", onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)(FormFields_1.RadioGroup, { name: "type", label: "Type", elements: Object.values(types_1.IncomeExpenseType) }), (0, jsx_runtime_1.jsx)(formik_1.Field, { name: "name", label: "Name", type: "text", component: FormFields_1.InputField }), (0, jsx_runtime_1.jsx)(formik_1.Field, { name: "monthlyBudget", label: "Monthly Budget", type: "number", component: FormFields_1.InputField }), (0, jsx_runtime_1.jsx)(formik_1.Field, { name: "description", label: "Description", type: "text", component: FormFields_1.InputField }), (0, jsx_runtime_1.jsx)(IconSelect_1.default, {}), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: !dirty || !isValid || isSubmitting, className: "w-full p-4 px-8 text-lg font-bold text-green-900 bg-green-300 rounded-lg drop-shadow-md hover:drop-shadow-lg hover:bg-green-400 disabled:opacity-75 disabled:hover:bg-slate-300 disabled:bg-slate-300 disabled:text-white disabled:drop-shadow-none", children: "Submit" })] }));
};
exports.default = CategoryForm;
