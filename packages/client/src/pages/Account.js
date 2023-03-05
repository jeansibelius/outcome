"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const utils_1 = require("../utils");
const Account = () => {
    const user = (0, utils_1.GetMe)();
    const [currentUser, setCurrentUser] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        setCurrentUser(user);
    }, [user]);
    if (!currentUser)
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading account details..." });
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Segment, { basic: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Header, { as: "h4", children: (0, jsx_runtime_1.jsxs)("strong", { children: [currentUser.first_name, " ", currentUser.last_name] }) }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Header, { as: "h5", children: "Belongs to spaces:" }), currentUser.spaces.map((space) => ((0, jsx_runtime_1.jsx)("div", { children: space.name }, space.id)))] }));
};
exports.default = Account;
