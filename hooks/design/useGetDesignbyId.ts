import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import auth from '../../auth/auth';
import { getDesignById } from './design.gql';

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetDesignbyId() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;
  const [fetchDesign, fetchDesignResponse] = useLazyQuery(getDesignById);

  return { fetchDesign, fetchDesignResponse };
}
