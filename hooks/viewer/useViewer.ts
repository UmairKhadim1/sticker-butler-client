import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import useAuthStore from '../globalStores/useAuthStore';
import { viewerQuery } from './viewer.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useViewer() {
  // @ts-ignore: Unreachable code error
  const { account, setAccount } = useAuthStore();
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;

  const { loading, data, refetch } = useQuery(viewerQuery);
  const viewer = data?.getUser;
  useEffect(() => {
    refetch();
  }, [authToken]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setAccount(viewer);
  }, [viewer]);

  return [account, loading, refetch];
}
