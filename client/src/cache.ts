import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { localStorageUser } from "./types";

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
            return me();
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

export const me: ReactiveVar<localStorageUser> = makeVar<localStorageUser>(
  localUser ? JSON.parse(localUser) : null
);
