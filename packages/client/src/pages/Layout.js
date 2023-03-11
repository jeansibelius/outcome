"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const semantic_ui_react_1 = require("semantic-ui-react");
const CategoryModal_1 = __importDefault(require("../components/CategoryModal"));
const EntryModal_1 = __importDefault(require("../components/EntryModal"));
const LoginModal_1 = __importDefault(require("../components/LoginModal"));
const BottomNavigation_1 = __importDefault(require("../components/BottomNavigation"));
const utils_1 = require("../utils");
const TopNavigation_1 = __importDefault(require("../components/TopNavigation"));
const Layout = () => {
    const [entryModalOpen, setEntryModalOpen] = react_1.default.useState(false);
    const [loginModalOpen, setLoginModalOpen] = react_1.default.useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = react_1.default.useState(false);
    const openEntryModal = () => setEntryModalOpen(true);
    const openCategoryModal = () => setCategoryModalOpen(true);
    const openLoginModal = () => setLoginModalOpen(true);
    const closeEntryModal = () => {
        setEntryModalOpen(false);
    };
    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
    };
    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };
    const sharedContent = () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Container, { className: "px-1 pt-8 pb-80", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }), (0, jsx_runtime_1.jsx)(BottomNavigation_1.default, { openEntryModal: openEntryModal, openCategoryModal: openCategoryModal, openLoginModal: openLoginModal }), (0, jsx_runtime_1.jsx)(LoginModal_1.default, { modalOpen: loginModalOpen, onClose: closeLoginModal })] }));
    if ((0, utils_1.IsLoggedIn)()) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TopNavigation_1.default, {}), sharedContent(), (0, jsx_runtime_1.jsx)(EntryModal_1.default, { modalOpen: entryModalOpen, onClose: closeEntryModal }), (0, jsx_runtime_1.jsx)(CategoryModal_1.default, { modalOpen: categoryModalOpen, onClose: closeCategoryModal })] }));
    }
    else {
        return sharedContent();
    }
};
exports.default = Layout;
