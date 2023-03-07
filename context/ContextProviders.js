import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';

export const ContextProviders = ({ children, pageProps }) => {
  // export const ContextProviders = ({ children, pageProps }) => {

  return <AuthProvider {...pageProps}>{children}</AuthProvider>;
};

ContextProviders.propTypes = {
  children: PropTypes.node,
  pageProps: PropTypes.object,
};
