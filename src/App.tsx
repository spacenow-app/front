import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  console.log("TOKEN", token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const GET_USERS = gql`
  {
    getAllUsers {
      id
      email
      password
      isEmailConfirmed
    }
  }
`;


const Users = () => (
  <Query query={GET_USERS}>
    {({ loading, error, data }: any) => {
      if (loading) return <p>Loading...</p>;
      if (error) return (
        <div>
          Bad: {error.graphQLErrors.map(({ message }: any, i: number) => (
            <span key={i}>{message}</span>
          ))}
        </div>
      )

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

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Users />
    </ApolloProvider>
  );
}

export default App;
