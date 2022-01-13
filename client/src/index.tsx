import React from "react";
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
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import cache from "./cache";

const uri = "/graphql";
const httpLink = new HttpLink({
  uri,
});

const authLink = setContext((_request, { headers }) => {
  const token = window.localStorage.getItem("token");
  if (typeof token === "string") {
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  } else {
    return headers;
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([errorLink, authLink, httpLink]),
  typeDefs,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const IsLoggedIn = (): boolean => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn;
};

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
