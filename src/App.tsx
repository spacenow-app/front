import React from "react";
import "./App.scss";
import { ApolloProvider, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache()
});

export const CREATE_ASSET = gql`
  mutation createAsset($file: Upload!) {
    createAsset(file: $file) {
      id
    }
  }
`;

const Users = () => (
  <Mutation mutation={CREATE_ASSET}>
    {(createAsset: any) => (
      <input
        type="file"
        required
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }: any) => validity.valid && createAsset({ variables: { file } })}
      />
    )}
  </Mutation>
);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Users />
    </ApolloProvider>
  );
};

export default App;
