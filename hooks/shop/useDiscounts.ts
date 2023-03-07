import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getDiscountCodes, createDiscountCodeMutation } from './shop.gql';
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

  const { loading, data, refetch } = useQuery(getDiscountCodes);
  const discounts = data?.getDiscountPriceRules;
  useEffect(() => {
    refetch();
  }, [authToken]);

  const [createDiscountCode, createDiscountCodeResponse] = useMutation(
    createDiscountCodeMutation
  );
  useEffect(() => {
    const data = createDiscountCodeResponse?.data;
    const loading = createDiscountCodeResponse?.loading;
    const called = createDiscountCodeResponse?.called;
    const error = createDiscountCodeResponse?.error;
    if (!loading && called) {
      if (data?.createDiscountCodePriceRule) {
        refetch();
      }
      if (error) {
        console.log(error);
      }
    }
  }, [createDiscountCodeResponse]);
  return [discounts, createDiscountCode, createDiscountCodeResponse];
}
