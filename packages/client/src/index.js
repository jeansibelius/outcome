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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dom_1 = __importDefault(require("react-dom"));
require("fomantic-ui-css/semantic.min.css");
require("./index.css");
const client_1 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const error_1 = require("@apollo/client/link/error");
const serviceWorkerRegistration = __importStar(require("./serviceWorkerRegistration"));
const cache_1 = __importStar(require("./cache"));
const App_1 = __importDefault(require("./App"));
const utils_1 = require("./utils");
const uri = "/graphql";
const httpLink = new client_1.HttpLink({
    uri,
});
const authLink = (0, context_1.setContext)((_request, { headers }) => {
    const token = window.localStorage.getItem("outcome-token");
    const activeSpace = (0, cache_1.activeSpaceVar)();
    if (typeof token === "string") {
        return {
            headers: {
                ...headers,
                authorization: token ? `bearer ${token}` : null,
                space: activeSpace ? activeSpace.id : null,
            },
        };
    }
    else {
        return headers;
    }
});
const errorLink = (0, error_1.onError)(({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(async ({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            if (message.includes("jwt expired") ||
                message.includes("Token missing")) {
                await (0, utils_1.logout)(client);
            }
        });
    if (networkError)
        console.log(`[Network error]: ${networkError}`);
    if (response)
        console.log("Response", response);
});
const typeDefs = (0, client_1.gql) `
  extend type Query {
    isLoggedIn: Boolean!
  }
`;
const client = new client_1.ApolloClient({
    cache: cache_1.default,
    link: (0, client_1.from)([errorLink, authLink, httpLink]),
    typeDefs,
});
react_dom_1.default.render((0, jsx_runtime_1.jsx)(client_1.ApolloProvider, { client: client, children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }), document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
