import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

const client = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:8080'
  });

  // client
  //   .query({
  //     query: gql`
  //       {
  //         todos {
  //           id
  //           title
  //         }
  //       }
  //     `
  //   })
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));
  
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent('GraphQLReactNative', () => client);
