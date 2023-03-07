/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/globals.css';
import '../public/css/app.css';
import '../public/css/tablet.css';
import { ApolloProvider } from '@apollo/client';
import { ContextProviders } from '../context/ContextProviders';
import client from '../apollo-client';
import withAuth from '../hooks/auth/withAuth';

function MyApp({ Component, pageProps }: any) {
  return (
    <ContextProviders>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ContextProviders>
  );
}
export default withAuth(MyApp);
