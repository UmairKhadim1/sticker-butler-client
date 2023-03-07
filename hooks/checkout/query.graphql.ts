import { gql } from '@apollo/client';
export const checkOut = gql`
  mutation checkOut($product: productInput!, $campignId: ID!, $segmentId: ID!) {
    checkout(product: $product, campignId: $campignId, segmentId: $segmentId)
  }
`;
