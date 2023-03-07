import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  addNewCampaignMutation,
  getCampaignByAccountId,
  getCampaignbyId,
  updateCampaignMutation,
  deleteCampaignMutation,
} from './query.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's Campaign ordersdata
 *
 * @returns {Array} the Campaign orders object  data
 */
export default function useCampaign() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;
  //fetch Campaign
  const [fetchCampaign, fetchCampaignResponse] = useLazyQuery(
    getCampaignByAccountId,
    { fetchPolicy: 'network-only' }
  );
  const [fetchCampaignById, fetchCampaignByIdResponse] = useLazyQuery(
    getCampaignbyId,
    { fetchPolicy: 'network-only' }
  );
  // // add new Campaign
  const [addNewCampaign, addCampaignResponse] = useMutation(
    addNewCampaignMutation
  );
  const [updateCampaign, updateCampaignResponse] = useMutation(
    updateCampaignMutation
  );
  const [deleteCampaign, deleteCampaignResponse] = useMutation(
    deleteCampaignMutation
  );

  // useEffect(() => {
  //   if (!addCampaignResponse.loading && addCampaignResponse.data) {
  //     refetch();
  //   }
  // }, [addCampaignResponse]);
  return [
    {
      fetchCampaign,
      fetchCampaignResponse,
    },
    {
      fetchCampaignById,
      fetchCampaignByIdResponse,
    },
    { addNewCampaign, addCampaignResponse },
    {
      updateCampaign,
      updateCampaignResponse,
    },
    {
      deleteCampaign,
      deleteCampaignResponse,
    },
  ];
}
