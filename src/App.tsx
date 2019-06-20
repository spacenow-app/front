import React from 'react';
import logo from './logo.svg';
import './App.scss';

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        getAllBookings {
          bookingId
        }
      }
    `}
  >
    {({ loading, error, data }: any) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllBookings.map(({ bookingId }: any, index: number) => (
        <div key={index}>
          <p>{bookingId}</p>
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
      <ExchangeRates />
    </ApolloProvider>
  );
}

export default App;
