import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import useAuthStore from '../globalStores/useAuthStore';
import { logOutUserMutation } from './mutations.gql';
import auth from '../../auth/auth';
import Router from 'next/router';

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useLogout() {
  // @ts-ignore: Unreachable code error
  const { logOut } = useAuthStore();
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;

  const [logOutSession] = useMutation(logOutUserMutation, {
    onCompleted(data) {

      logOut();
      setTimeout(() => {
        Router.push('/auth/sign-in');
      }, 100);
    },
    onError(err) {
      const { graphQLErrors } = err;
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          // eslint-disable-next-line no-console
        });
      }
    },
  });
  const logOutUser = () => {
    auth.clearAppStorage();

    logOutSession({ variables: { refreshToken: authToken } });
  };

  return [logOutUser];
}
