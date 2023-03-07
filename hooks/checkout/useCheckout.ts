import auth from '../../auth/auth';
import { checkOut } from './query.graphql';
import { useMutation } from '@apollo/client';

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useCheckout() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;
  const [checkout, checkoutResponse] = useMutation(checkOut);

  return { checkout, checkoutResponse };
}
