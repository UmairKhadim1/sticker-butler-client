import { gql } from '@apollo/client';

export const addNewCampaignMutation = gql`
  mutation createCampaignMutation($campaignName: String!, $addressId: ID!) {
    createCampaign(
      input: { addressId: $addressId, campaignName: $campaignName }
    ) {
      status
      message
      campaignData {
        _id
        name
      }
    }
  }
`;
export const getCampaignByAccountId = gql`
  query getCampaignsByAccountId(
    $searchQuery: String
    $filterBy: String
    $orderBy: String
    $sortBy: sortBy
  ) {
    getAllCampaigns(
      searchQuery: $searchQuery
      filterBy: $filterBy
      orderBy: $orderBy
      sortBy: $sortBy
    ) {
      data {
        _id
        paymentStatus
        step

        type
        discountCode
        discountCodeId
        trackingInterval
        name
        segment {
          _id
          name
          updatedAt
          customers
          conditions {
            constraint
            sign
            parameter
            filter
          }
        }
        design {
          _id
             fileType {
          back
          front
        }
          mediaURLs {
            front
            back
          }
        }
        updatedAt
        createdAt
      }
    }
  }
`;
export const getCampaignbyId = gql`
  query getCampaignById($campaignId: ID) {
    getSingleCampaign(campaignId: $campaignId) {
      _id
      step
      orderDate
      price {
        amount
        currency
      }
      address {
        _id
        address1
        address2
        city
        state
        zipCode
      }
      segment {
        _id
        name
        updatedAt
        customers
        csvLocation
        conditions {
          constraint
          sign
          parameter
          filter
        }
      }
      design {
           fileType {
          back
          front
        }
        _id
        name
        mediaURLs {
          back
          front
        }
      }
      name
      type
      discountCode
      discountCodeId
      trackingInterval
      trackingData
    }
  }
`;
export const updateCampaignMutation = gql`
  mutation updateCampaignById(
    $campaignId: ID!
    $campaignName: String
    $addressId: ID
    $step: Int
    $discountCode: String
    $discountCodeId: String
    $trackingInterval: Int
    $segmentId: ID
    $type: CampaginType
    $designId: ID
  ) {
    updateCampaign(
      input: {
        campaignId: $campaignId
        campaignName: $campaignName
        addressId: $addressId
        segmentId: $segmentId
        discountCode: $discountCode
        discountCodeId: $discountCodeId
        step: $step
        trackingInterval: $trackingInterval
        type: $type
        designId: $designId
      }
    ) {
      status
      step

      message
      campaignData {
        address
        name
        segmentId
        type
        designId
        discountCode
        discountCodeId
        trackingInterval
      }
    }
  }
`;
export const deleteCampaignMutation = gql`
  mutation deleteCampaign($campaignId: ID!) {
    deleteCampaign(input: { campaignId: $campaignId }) {
      message
      status
    }
  }
`;

export const getCampaignOrderByAccountId = gql`
  query getAllCampaignOrders(
    $searchQuery: String
    $filterBy: String
    $orderBy: String
    $sortBy: sortBy
  ) {
    getAllCampaignOrders(
      searchQuery: $searchQuery
      filterBy: $filterBy
      orderBy: $orderBy
      sortBy: $sortBy
    ) {
      data {
        _id
        paymentStatus
        step
        orderDate
        type
        discountCode
        discountCodeId
        trackingInterval
        name
        price {
          amount
          currency
        }
        segment {
          _id
          name
          updatedAt
          customers
          conditions {
            constraint
            sign
            parameter
            filter
          }
        }
        design {
             fileType {
          back
          front
        }
          _id
          mediaURLs {
            front
            back
          }
        }
        updatedAt
        createdAt
      }
    }
  }
`;
