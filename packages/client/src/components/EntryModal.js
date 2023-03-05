"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const client_1 = require("@apollo/client");
const queries_1 = require("../queries");
const utils_1 = require("../utils");
const dates_1 = require("../utils/dates");
const NewEntryForm_1 = __importDefault(require("./NewEntryForm"));
const UpdateEntryForm_1 = __importDefault(require("./UpdateEntryForm"));
const AddEntryModal = ({ modalOpen, onClose, isUpdatingEntry = false, updateEntryValues, }) => {
    const [error, setError] = react_1.default.useState();
    const [createEntry] = (0, client_1.useMutation)(queries_1.CREATE_ENTRY, {
        refetchQueries: [{ query: queries_1.ALL_ENTRIES }],
        onError: (error) => {
            throw new Error(error.message);
        },
    });
    const [updateEntry] = (0, client_1.useMutation)(queries_1.UPDATE_ENTRY, {
        refetchQueries: [{ query: queries_1.ALL_ENTRIES }],
    });
    const [deleteEntry] = (0, client_1.useMutation)(queries_1.DELETE_ENTRY, {
        refetchQueries: [{ query: queries_1.ALL_ENTRIES }],
    });
    const submitNewEntry = async (values) => {
        try {
            const newEntry = (0, utils_1.toNewEntry)(values);
            await createEntry({
                variables: { entryData: newEntry },
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
    const submitUpdateEntry = async (data) => {
        try {
            if (!updateEntryValues) {
                throw new Error("Values missing from the entry you're trying to update.");
            }
            const updateData = (0, utils_1.toNewEntry)(data);
            // Keep original date with time, if date is unchanged
            if ((0, dates_1.getYearMonthDay)(updateData.date) ===
                (0, dates_1.getYearMonthDay)(updateEntryValues.date)) {
                updateData.date = updateEntryValues.date;
            }
            await updateEntry({
                variables: { id: updateEntryValues.id, data: updateData },
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
    const onDelete = async (id) => {
        try {
            const response = await deleteEntry({ variables: { id: id } });
            onClose();
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                //TODO add some toast or error handling
            }
            return console.log(error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Modal, { className: "p-2", open: modalOpen, onClose: onClose, centered: true, closeIcon: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Modal.Header, { children: isUpdatingEntry && updateEntryValues ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Edit entry", (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { floated: "right", as: semantic_ui_react_1.Button, icon: "trash", size: "mini", content: "Delete", color: "red", style: { margin: "0 2em" }, onClick: () => onDelete(updateEntryValues.id) })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Add a new entry" })) }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Modal.Content, { children: [error && (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Segment, { inverted: true, color: "red", children: `Error: ${error}` }), isUpdatingEntry && updateEntryValues ? ((0, jsx_runtime_1.jsx)(UpdateEntryForm_1.default, { onSubmit: submitUpdateEntry, updateEntryValues: updateEntryValues })) : ((0, jsx_runtime_1.jsx)(NewEntryForm_1.default, { onSubmit: submitNewEntry }))] })] }));
};
exports.default = AddEntryModal;
