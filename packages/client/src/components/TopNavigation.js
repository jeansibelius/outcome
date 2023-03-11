"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const semantic_ui_react_1 = require("semantic-ui-react");
const logo_1 = require("../logo");
const utils_1 = require("../utils");
const BottomNavigation_1 = require("./BottomNavigation");
const CustomMenuItemWithLink_1 = __importDefault(require("./CustomMenuItemWithLink"));
const TopNavigation = () => {
    const user = (0, utils_1.GetMe)();
    const space = (0, utils_1.GetActiveSpace)();
    const [currentUser, setCurrentUser] = react_1.default.useState(null);
    const [currentSpace, setCurrentSpace] = react_1.default.useState(null);
    let navigate = (0, react_router_dom_1.useNavigate)();
    const client = (0, client_1.useApolloClient)();
    react_1.default.useEffect(() => {
        setCurrentUser(user);
    }, [user]);
    react_1.default.useEffect(() => {
        setCurrentSpace(space);
    }, [space]);
    const handleLogout = async () => {
        await (0, utils_1.logout)(client);
        navigate("/");
    };
    if (!currentUser || !currentSpace)
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading user..." });
    return ((0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Menu, { fluid: true, secondary: true, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Menu.Item, { position: "left", children: (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Image, { as: react_router_dom_1.Link, to: "/", src: logo_1.logo, size: "mini" }) }), (0, jsx_runtime_1.jsxs)(CustomMenuItemWithLink_1.default, { to: BottomNavigation_1.budgetPath, children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Icon, { name: "tags" }), currentSpace.name] }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Dropdown, { icon: "user", button: true, className: "icon right item", children: (0, jsx_runtime_1.jsxs)(semantic_ui_react_1.Dropdown.Menu, { children: [(0, jsx_runtime_1.jsx)(semantic_ui_react_1.Dropdown.Item, { as: react_router_dom_1.Link, to: "/account", text: "Account", icon: "setting" }), (0, jsx_runtime_1.jsx)(semantic_ui_react_1.Dropdown.Item, { text: "Log out", icon: "log out", onClick: () => handleLogout() })] }) })] }));
};
exports.default = TopNavigation;
