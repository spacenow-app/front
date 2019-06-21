import React from 'react';
import logo from './logo.svg';
import './App.scss';

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const Users = () => (
  <Query
    query={gql`
      {
        getAllUsers {
          id
          email
          password
          isEmailConfirmed
        }
      }
    `}
  >
    {({ loading, error, data }: any) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p><pre>Bad: {error.graphQLErrors.map(({ message }: any, i: number) => (
        <span key={i}>{message}</span>
      ))}
      </pre></p>;

      return data.getAllUsers.map(({ 
        id,
        email,
        password,
        isEmailConfirmed
       }: any, index: number) => (
        <div key={index}>
          <p>{id}</p>
          <p>{email}</p>
          <p>{password}</p>
          <p>{isEmailConfirmed}</p>
        </div>
      ));
    }}
  </Query>
);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Users />
    </ApolloProvider>
  );
}

export default App;
