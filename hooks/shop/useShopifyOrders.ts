import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { getShopifyOrders } from './shop.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's shopify ordersdata
 *
 * @returns {Array} the shopify orders object  data
 */
export default function useShopifyOrders() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;

  const [loadOrders, { loading, data, refetch, error }] =
    useLazyQuery(getShopifyOrders);
  const orders = data?.getOrders;
  // useEffect(() => {
  //   refetch();
  // }, [authToken]);

  return [loadOrders, orders, loading, error, refetch];
}
