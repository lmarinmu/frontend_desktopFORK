// GraphQL Configuration File

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  //TODO: XD, tengo que ajustar bien esta variable de entorno
  uri: process.env.GRAPHQL_API ?? "http://localhost:4000/query",
  fetch,
});

export const serverClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default serverClient;
