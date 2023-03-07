import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { createDiscountCodeMutation } from './shop.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's shpify store data
 *
 * @returns {Array} the store's data
 */
export default function useDiscounts() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;

  const [createDiscountCode, createDiscountCodeResponse] = useMutation(
    createDiscountCodeMutation
  );

  return [createDiscountCode, createDiscountCodeResponse];
}
