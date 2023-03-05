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
exports.NoEntries = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const client_1 = require("@apollo/client");
const queries_1 = require("../queries");
const semantic_ui_react_1 = require("semantic-ui-react");
const EntryModal_1 = __importDefault(require("../components/EntryModal"));
const utils_1 = require("../utils");
const Entry_1 = __importDefault(require("../components/Entry"));
const dates_1 = require("../utils/dates");
const CategoryFilter_1 = __importDefault(require("../components/CategoryFilter"));
const NoEntries = () => ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Segment, { basic: true, children: "No entries. Please add some using the \"New entry\" button below." }));
exports.NoEntries = NoEntries;
const Entries = () => {
    const getEntries = (0, client_1.useQuery)(queries_1.ALL_ENTRIES);
    const getCategories = (0, client_1.useQuery)(queries_1.ALL_CATEGORIES);
    const [entries, setEntries] = react_1.default.useState(undefined);
    const [categories, setCategories] = react_1.default.useState([]);
    const [filteredCategories, setFilteredCategories] = react_1.default.useState([]);
    const [modalOpen, setModalOpen] = react_1.default.useState(false);
    const [updateEntryValues, setUpdateEntryValues] = react_1.default.useState(undefined);
    const currentViewDateRange = (0, client_1.useQuery)(queries_1.GET_CURRENT_VIEW_RANGE);
    const startInit = (0, dates_1.getYearMonth)({});
    const endInit = (0, dates_1.getYearMonth)({ addMonth: 1 });
    const initDate = { start: startInit, end: endInit };
    const [dateFilter, setDateFilter] = (0, react_1.useState)(initDate);
    (0, react_1.useEffect)(() => {
        setDateFilter(currentViewDateRange.data.currentViewMonth);
    }, [currentViewDateRange]);
    react_1.default.useEffect(() => {
        const entryIsWithinDateRange = (entry) => {
            const entryDate = new Date(entry.date);
            return entryDate >= dateFilter.start && entryDate < dateFilter.end;
        };
        if (getEntries.data && filteredCategories.length > 0) {
            // If the category filtering is active, also check against filteredCategories
            setEntries(getEntries.data.returnAllEntries.filter((entry) => {
                const categoryId = entry.category ? entry.category.id : "";
                return (entryIsWithinDateRange(entry) &&
                    filteredCategories.indexOf(categoryId) > -1);
            }));
        }
        else if (getEntries.data) {
            // else check only against dateFilter
            setEntries(getEntries.data.returnAllEntries.filter((entry) => {
                return entryIsWithinDateRange(entry);
            }));
        }
    }, [getEntries.data, dateFilter, filteredCategories]);
    react_1.default.useEffect(() => {
        if (getCategories.data) {
            setCategories(getCategories.data.returnAllCategories.reduce((arr, category) => {
                return [...arr, category];
            }, []));
        }
    }, [getCategories.data]);
    const openEntryUpdateModal = (data) => {
        setUpdateEntryValues(data);
        setModalOpen(true);
    };
    const closeEntryUpdateModal = () => {
        setModalOpen(false);
    };
    const handleCategoryFilterChange = (data) => {
        if (data.length > 0) {
            setFilteredCategories(data);
        }
        else {
            setFilteredCategories(categories.reduce((arr, category) => [...arr, category.id], []));
        }
    };
    if (!(0, utils_1.IsLoggedIn)()) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Please login." });
    }
    if (getEntries.loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading" });
    }
    if (getEntries.error) {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "Error loading entries." }), (0, jsx_runtime_1.jsx)("i", { children: getEntries.error.message })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [updateEntryValues ? ((0, jsx_runtime_1.jsx)(EntryModal_1.default, { modalOpen: modalOpen, onClose: closeEntryUpdateModal, isUpdatingEntry: true, updateEntryValues: updateEntryValues })) : null, (0, jsx_runtime_1.jsx)(CategoryFilter_1.default, { categories: categories, filterView: handleCategoryFilterChange }), entries && entries.length > 0 ? ((0, jsx_runtime_1.jsx)(semantic_ui_react_1.Feed, { size: "large", children: [...entries] // create a copy of entries array to disable strict mode in order to sort it
                    .sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()))
                    .map((entry) => ((0, jsx_runtime_1.jsx)(Entry_1.default, { entry: entry, updateEntry: openEntryUpdateModal }, entry.id))) })) : ((0, jsx_runtime_1.jsx)(exports.NoEntries, {}))] }));
};
exports.default = Entries;
