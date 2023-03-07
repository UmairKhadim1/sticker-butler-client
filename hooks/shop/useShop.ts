import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { getShops } from './shop.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's shpify store data
 *
 * @returns {Array} the store's data
 */
export default function useShop() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;

  const { loading, data, refetch } = useQuery(getShops);
  const shops = data?.getShops;
  useEffect(() => {
    refetch();
  }, [authToken]);

  return [shops, loading, refetch];
}
