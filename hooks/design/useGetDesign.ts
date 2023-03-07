import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import auth from '../../auth/auth';
import {
  createDesignMutation,
  updateDesignMutation,
  deleteDesignMutation,
  getDesignsQuery,
} from './design.gql';

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetDesign() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;
  const { loading, data, refetch, error } = useQuery(getDesignsQuery);
  const designsData = data?.getDesigns?.data;
  let designLoading = loading;
  useEffect(() => {
    refetch();
  }, [authToken]);
  return { designsData, designLoading, error, refetch };
}
