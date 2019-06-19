import React from 'react';
import logo from './logo.svg';
import './App.scss';

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        listing {
          listingId,
          currency,
          totalPrice
        }
      }
    `}
  >
    {({ loading, error, data }: any) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.listing.map(({ listingId, currency, totalPrice }: any, index: number) => (
        <div key={index}>
          <p>{listingId}: {currency} {totalPrice}</p>
        </div>
      ));
    }}
  </Query>
);

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ExchangeRates />
    </ApolloProvider>
  );
}

export default App;
