import { useLazyQuery } from '@apollo/client';
import { getCampaignOrderByAccountId } from './query.gql';

/**
 * Gets current viewer's Campaign ordersdata
 *
 * @returns {Array} the Campaign orders object  data
 */
export default function useCampaignOrders() {
  // @ts-ignore: Unreachable code error

  //fetch Campaign
  const [fetchCampaignOrder, fetchCampaignOrderResponse] = useLazyQuery(
    getCampaignOrderByAccountId
  );
  return [fetchCampaignOrder, fetchCampaignOrderResponse];
}
