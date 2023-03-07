import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  addNewSegmentMutation,
  getSegmentByAccountId,
  getSegmentbyId,
  updateSegmentMutation,
  deleteSegmentMutation,
} from './query.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's shopify ordersdata
 *
 * @returns {Array} the shopify orders object  data
 */
export default function useSegments() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;
  //fetch Segment
  const [fetchSegment, fetchSegmentResponse] = useLazyQuery(
    getSegmentByAccountId,
    { fetchPolicy: 'network-only' }
  );
  const [fetchSegmentById, fetchSegmentByIdResponse] = useLazyQuery(
    getSegmentbyId,
    { fetchPolicy: 'network-only' }
  );
  // add new Segment
  const [addNewSegment, addSegmentResponse] = useMutation(
    addNewSegmentMutation
  );
  const [updateSegment, updateSegmentResponse] = useMutation(
    updateSegmentMutation
  );
  const [deleteSegment, deleteSegmentResponse] = useMutation(
    deleteSegmentMutation
  );

  const { data, refetch } = fetchSegmentResponse;
  // useEffect(() => {
  //   if (!addSegmentResponse.loading && addSegmentResponse.data) {
  //     refetch();
  //   }
  // }, [addSegmentResponse]);
  return [
    { fetchSegment, fetchSegmentResponse },
    { fetchSegmentById, fetchSegmentByIdResponse },
    { addNewSegment, addSegmentResponse },
    { updateSegment, updateSegmentResponse },
    { deleteSegment, deleteSegmentResponse },
  ];
}
