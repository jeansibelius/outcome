"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const NewCategoryForm_1 = __importDefault(require("./NewCategoryForm"));
const client_1 = require("@apollo/client");
const queries_1 = require("../queries");
const utils_1 = require("../utils");
const UpdateCategoryForm_1 = __importDefault(require("./UpdateCategoryForm"));
const CategoryModal = ({ modalOpen, onClose, isUpdatingCategory = false, updateCategoryValues, }) => {
    const [error, setError] = react_1.default.useState();
    const [createCategory] = (0, client_1.useMutation)(queries_1.CREATE_CATEGORY, {
        refetchQueries: [{ query: queries_1.ALL_CATEGORIES }],
        onError: (error) => {
            throw new Error(error.message);
        },
    });
    const [updateCategory] = (0, client_1.useMutation)(queries_1.UPDATE_CATEGORY, { refetchQueries: [{ query: queries_1.ALL_CATEGORIES }, { query: queries_1.ALL_ENTRIES }] });
    const [deleteCategory] = (0, client_1.useMutation)(queries_1.DELETE_CATEGORY, {
        refetchQueries: [{ query: queries_1.ALL_CATEGORIES }, { query: queries_1.ALL_ENTRIES }],
    });
    const submitNewCategory = async (values) => {
        try {
            const newCategory = (0, utils_1.toNewCategory)(values);
            await createCategory({
                variables: { categoryData: newCategory },
            });
            setError(undefined);
            onClose();
        }
        catch (error) {
            if (error && error instanceof Error) {
                //TODO handle error better
                setError(error.message);
            }
            console.log("error", error);
        }
    };
    const onDelete = async (id) => {
        try {
            const response = await deleteCategory({ variables: { id: id } });
            onClose();
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                //TODO add some toast or error handling
            }
            console.log(error);
            return;
        }
    };
    const submitUpdateCategory = async (data) => {
        try {
            if (!updateCategoryValues) {
                throw new Error("Values missing from the entry you're trying to update.");
            }
            const updateData = (0, utils_1.toNewCategory)(data);
            await updateCategory({
                variables: { id: updateCategoryValues.id, data: updateData },
            });
            onClose();
        }
        catch (error) {
            if (error && error instanceof Error) {
                //TODO handle error better
                setError(error.message);
            }
            console.log(error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Modal, { className: "p-2", open: modalOpen, onClose: onClose, centered: true, closeIcon: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Modal.Header, { children: isUpdatingCategory && updateCategoryValues ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Edit category", (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { floated: "right", as: semantic_ui_react_1.Button, icon: "trash", size: "mini", content: "Delete", color: "red", style: { margin: "0 2em" }, onClick: () => onDelete(updateCategoryValues.id) })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Add a new category" })) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Modal.Content, { children: [error && (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Segment, { inverted: true, color: "red", children: `Error: ${error}` }), isUpdatingCategory && updateCategoryValues ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(UpdateCategoryForm_1.default, { onSubmit: submitUpdateCategory, updateCategoryValues: updateCategoryValues }) })) : ((0, jsx_runtime_1.jsx)(NewCategoryForm_1.default, { onSubmit: submitNewCategory }))] })] }));
};
exports.default = CategoryModal;
