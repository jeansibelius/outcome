"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentViewDateRangeVar = exports.activeSpaceVar = exports.currentUserVar = exports.isLoggedInVar = void 0;
const client_1 = require("@apollo/client");
// Add logged in status to cache and make it callable (read())
const cache = new client_1.InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return (0, exports.isLoggedInVar)();
                    },
                },
                me: {
                    read() {
                        return (0, exports.currentUserVar)();
                    },
                },
                activeSpace: {
                    read() {
                        return (0, exports.activeSpaceVar)();
                    },
                },
                currentViewMonth: {
                    read() {
                        return (0, exports.currentViewDateRangeVar)();
                    },
                },
            },
        },
    },
});
exports.default = cache;
// Create a Apollo ReactiveVar to store the logged in status (and initialise with token from
// localStorage)
exports.isLoggedInVar = (0, client_1.makeVar)(!!localStorage.getItem("outcome-token"));
const localUser = localStorage.getItem("outcome-user");
const initLocalUser = localUser ? JSON.parse(localUser) : null;
exports.currentUserVar = (0, client_1.makeVar)(initLocalUser);
exports.activeSpaceVar = (0, client_1.makeVar)(initLocalUser ? initLocalUser.spaces[0] : null);
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth());
const endDate = new Date(today.getFullYear(), today.getMonth() + 1);
exports.currentViewDateRangeVar = (0, client_1.makeVar)({ start: startDate, end: endDate });
