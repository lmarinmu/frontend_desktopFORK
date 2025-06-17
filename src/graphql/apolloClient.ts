// GraphQL Configuration File

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  //TODO: This environment variable should be better adjusted
  uri: process.env.GRAPHQL_API ?? "http://localhost:4000/query",
  fetch,
});

export const serverClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default serverClient;
