import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { localStorageUser, Space } from "./types";

// Add logged in status to cache and make it callable (read())
const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        me: {
          read() {
            return currentUserVar();
          },
        },
        activeSpace: {
          read() {
            return activeSpaceVar();
          },
        },
        currentViewMonth: {
          read() {
            return currentViewMonthVar();
          },
        },
      },
    },
  },
});

export default cache;

// Create a Apollo ReactiveVar to store the logged in status (and initialise with token from
// localStorage)
export const isLoggedInVar: ReactiveVar<boolean> = makeVar<boolean>(
  !!localStorage.getItem("outcome-token")
);

const localUser = localStorage.getItem("outcome-user");
const initLocalUser = localUser ? JSON.parse(localUser) : null;
const today = new Date();
const currentDate = new Date(today.getFullYear(), today.getMonth());

export const currentUserVar: ReactiveVar<localStorageUser> =
  makeVar<localStorageUser>(initLocalUser);

export const activeSpaceVar: ReactiveVar<Space> = makeVar<Space>(
  initLocalUser ? initLocalUser.spaces[0] : null
);

export const currentViewMonthVar: ReactiveVar<Date> =
  makeVar<Date>(currentDate);
