import { gql } from '@apollo/client';

export const addNewSegmentMutation = gql`
  mutation createSegmentMutation(
    $name: String!
    $csvUrl: String
    $customers: Int
    $conditions: [ConditionsInput]!
  ) {
    createSegment(
      input: {
        csvUrl: $csvUrl
        customers: $customers
        name: $name
        conditions: $conditions
      }
    ) {
      status
      message
      data {
        _id
        csvUrl
        customers
        name
        conditions {
          constraint
          filter
          parameter
        }
        createdBy
        createdAt
      }
    }
  }
`;
export const getSegmentByAccountId = gql`
  query getSegmentByAccountId(
    $name: String
    $filterBy: String
    $orderBy: String
    $sortBy: sortBy
  ) {
    getSegments(
      name: $name
      filterBy: $filterBy
      orderBy: $orderBy
      sortBy: $sortBy
    ) {
      data {
        _id
        name
        customers
        csvUrl
        updatedAt
        conditions {
          parameter
          sign
        filterId
          filter
          constraint
          constraintId
        }
      }
    }
  }
`;
export const getSegmentbyId = gql`
  query getSegmentbyId($segmentId: ID!) {
    getSegmentById(segmentId: $segmentId) {
      _id
      name
      customers
      csvUrl
      csvLocation
      conditions {
        parameter
        customerNumber
        filter
        sign
        constraint
        filterId
        constraintId
      }
    }
  }
`;
export const updateSegmentMutation = gql`
  mutation updateSegment(
    $name: String!
    $customers: Int
    $segmentId: ID!
    $csvUrl: String
    $conditions: [ConditionsInput]!
  ) {
    updateSegment(
      input: {
        name: $name
        csvUrl: $csvUrl
        conditions: $conditions
        segmentId: $segmentId
        customers: $customers
      }
    ) {
      data {
        customers
        csvUrl
        conditions {
          filter
          parameter
          constraint
          constraintId
        filterId
          sign
        }
        name
      }
      status
      message
    }
  }
`;
export const deleteSegmentMutation = gql`
  mutation deleteSegment($segmentId: ID!) {
    deleteSegment(input: { segmentId: $segmentId }) {
      data {
        _id
      }
      message
      status
    }
  }
`;
