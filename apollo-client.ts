import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  fromPromise,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { onError } from '@apollo/link-error';
// import { omitTypenameLink } from "./omitVariableTypenameLink";
import { getMainDefinition } from '@apollo/client/utilities';
import auth from './auth/auth';
import Router from 'next/router';

const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const graphqlUrl = `${process.env.GRAPHQL_URL}`;
// const graphqlUrl = 'http://localhost:8000/graphql';

let token;

/**
 * @summary Set the access token that GraphQL requests will use in the Authorization header
 * @param {String} value New token value
 * @return {undefined}
 */
const omitTypename = (key: any, value: any) =>
  key === '__typename' ? undefined : value;

export const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward ? forward(operation) : null;
});
export function setAccessToken(value: String) {
  token = value;
}
function getTokenPair() {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var graphql = JSON.stringify({
      query:
        'mutation refreshTokenMutation(\r\n      $accessToken: String!\r\n      $refreshToken: String!\r\n    ) {\r\n      refreshToken(\r\n        input: { accessToken: $accessToken, refreshToken: $refreshToken }\r\n      ) {\r\n        sessionId\r\n        tokens {\r\n          accessToken\r\n          refreshToken\r\n        }\r\n        user {\r\n          name \r\n          email \r\n    store      profilePhoto        }\r\n      }\r\n    }',
      variables: auth.getToken(),
    });
    var requestOptions = <Object>{
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    };

    fetch(graphqlUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        if (data.data.refreshToken) {
          resolve(data.data.refreshToken.tokens);
        } else {
          reject('refresh token failed');
          auth.clearAppStorage();
        }
      })
      .catch((error) => {
        console.log('error', error);
        auth.clearAppStorage();

        reject(error);
      });
  });
}
const getNewToken = async () => {
  console.log('refreshing token');
  return getTokenPair();
};

let isRefreshing = false;
let pendingRequests = <any>[];

const resolvePendingRequests = () => {
  pendingRequests.map((callback: Function) => callback());
  pendingRequests = [];
};

const httpLink = new HttpLink({ uri: graphqlUrl });

// error handling for Apollo Link
// @ts-ignore: Unreachable code error
const errorLink = onError((apolloError) => {
  const { graphQLErrors, networkError, operation, forward } = apolloError;

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error]: ${message}`, {
        locations,
        operationName: operation && operation.operationName,
        path,
      });
    });
  }

  if (networkError) {
    console.log('networkError', networkError);
    // @ts-ignore: Unreachable code error
    const errorCode = networkError.response && networkError.response.status;
    if (errorCode === STATUS_UNAUTHORIZED) {
      // If a 401 Unauthorized error occurred, silently refresh the token from /refresh.
      // This will re-authenticate the user without showing a login page and a new token is issued.

      let pendingRequestsQueue;
      if (!isRefreshing) {
        isRefreshing = true;
        pendingRequestsQueue = fromPromise(
          getNewToken()
            // eslint-disable-next-line promise/always-return
            .then((tokens) => {
              // @ts-ignore: Unreachable code error

              auth.setToken(tokens, true);
              resolvePendingRequests();
            })
            .catch((error) => {
              pendingRequests = [];
              // eslint-disable-next-line no-console
              auth.clearAppStorage();
              console.error(error);

              Router.push('/auth/sign-in?callback =' + encodeURIComponent(Router.asPath));
            })
            .finally(() => {
              isRefreshing = false;
            })
        );
      } else {
        // We already have a pending refresh, therefore add the request to the queue
        // The request will be resolved after the token refresh finished and all previous requests resolved.
        pendingRequestsQueue = fromPromise(
          new Promise((resolve) => {
            pendingRequests.push(() => resolve(null));
          })
        );
      }

      return pendingRequestsQueue.flatMap(() => forward(operation));
    }
    if (errorCode !== STATUS_BAD_REQUEST) {
      // eslint-disable-next-line no-console
      console.error(
        `Unable to access the GraphQL API. Is it running and accessible at ${graphqlUrl} from the Storefront UI server?`
      );
    }
  }

  // Default
  return null;
});
// @ts-ignore: Unreachable code error
const authLink = setContext((_, { headers }) => {
  const token = auth.getToken() || null;
  return token
    ? {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token.accessToken}` : '',
      },
    }
    : null;
});

const client = new ApolloClient({
  ssrMode: false,
  // link: ApolloLink.from([omitTypenameLink,  authLink, httpLink]),
  link: ApolloLink.from([omitTypenameLink, errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
