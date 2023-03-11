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
const formik_1 = require("formik");
const EntryForm_1 = __importStar(require("./EntryForm"));
const UpdateEntryForm = (0, formik_1.withFormik)({
    // Transform outer props into form values
    mapPropsToValues: ({ updateEntryValues }) => {
        return {
            type: updateEntryValues.type,
            date: updateEntryValues.date.toString().slice(0, 10),
            name: updateEntryValues.name,
            amount: updateEntryValues.amount,
            description: !updateEntryValues.description
                ? ""
                : updateEntryValues.description,
            category: updateEntryValues.category?.id,
        };
    },
    validationSchema: EntryForm_1.EntryValidationSchema,
    handleSubmit: async (values, { props }) => {
        // do submitting things
        try {
            await props.onSubmit(values);
        }
        catch (error) {
            console.log("handleSubmit error", error);
        }
    },
    displayName: "NewEntryForm",
})(EntryForm_1.default);
exports.default = UpdateEntryForm;
