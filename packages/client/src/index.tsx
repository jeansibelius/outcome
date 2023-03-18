import ReactDOM from "react-dom";
import "fomantic-ui-css/semantic.min.css";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  from,
  gql,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import cache, { activeSpaceVar } from "./cache";
import App from "./App";
import { logout } from "./utils";

const uri = "/graphql";
const httpLink = new HttpLink({
  uri,
});

const authLink = setContext((_request, { headers }) => {
  const token = window.localStorage.getItem("outcome-token");
  const activeSpace = activeSpaceVar();
  if (typeof token === "string") {
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
        space: activeSpace ? activeSpace.id : null,
      },
    };
  } else {
    return headers;
  }
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(async ({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (
        message.includes("jwt expired") ||
        message.includes("Token missing")
      ) {
        await logout(client);
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
  if (response) console.log("Response", response);
});

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([errorLink, authLink, httpLink]),
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
