import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export default cache;

export const isLoggedInVar: ReactiveVar<boolean> = makeVar<boolean>(
  !!localStorage.getItem("token")
);
