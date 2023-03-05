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
const LoginForm_1 = __importDefault(require("./LoginForm"));
const cache_1 = require("../cache");
const LoginModal = ({ modalOpen, onClose }) => {
    const [error, setError] = react_1.default.useState();
    const [login] = (0, client_1.useMutation)(queries_1.LOGIN, {
        onCompleted({ login }) {
            if (login) {
                localStorage.setItem("outcome-token", login.token);
                localStorage.setItem("outcome-user", JSON.stringify(login.user));
                (0, cache_1.isLoggedInVar)(true);
                (0, cache_1.currentUserVar)(login.user);
                (0, cache_1.activeSpaceVar)(login.user.spaces[0]);
            }
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
    const submitLogin = async (email, password) => {
        try {
            const response = await login({
                variables: { email, password },
            });
            setError(undefined);
            onClose();
            const token = response.data?.login?.token;
            return token;
        }
        catch (error) {
            if (error && error instanceof Error) {
                //TODO handle error better
                setError(error.message);
            }
            console.log("error", error);
            return;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Modal, { className: "p-2", open: modalOpen, onClose: onClose, centered: true, closeIcon: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Modal.Header, { children: "Login" }), (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Modal.Content, { children: [error && (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Segment, { inverted: true, color: "red", children: `Error: ${error}` }), (0, jsx_runtime_1.jsx)(LoginForm_1.default, { onSubmit: submitLogin })] })] }));
};
exports.default = LoginModal;
