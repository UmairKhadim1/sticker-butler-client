import { gql } from '@apollo/client';
export const createDesignMutation = gql`
  mutation createNewDesign(
    $name: String!
    $storeID: ID
    $mediaURLs: DesignMediaURLInput!
  ) {
    createDesign(
      input: { name: $name, mediaURLs: $mediaURLs, storeID: $storeID }
    ) {
      status
      message
      data {
        name
        createdAt
        updatedAt
        mediaURLs {
          back
          front
        }
      }
    }
  }
`;

export const deleteDesignMutation = gql`
  mutation deleteDesignMutation($designId: ID!) {
    deleteDesign(designId: $designId) {
      status
      data {
        name
      }
    }
  }
`;
export const getDesignsQuery = gql`
  query (
    $designName: String
    $filterBy: String
    $orderBy: String
    $sortBy: sortBy
  ) {
    getDesigns(
      designName: $designName
      filterBy: $filterBy
      orderBy: $orderBy
      sortBy: $sortBy
    ) {
      data {
        _id
        storeID
        name
        createdBy
        createdAt
        fileType {
          back
          front
        }
        updatedAt
        mediaURLs {
          front
          back
        }
      }
    }
  }
`;
export const getDesignById = gql`
  query getDesign($designId: ID!) {
    getDesignById(designId: $designId) {
      _id
      storeID
      name
      createdBy
      createdAt
      updatedAt
      fileType {
        back
        front
      }
      mediaURLs {
        front
        back
      }
    }
  }
`;

export const deleteDesignById = gql`
  mutation deleteDesignById($designId: ID!) {
    deleteDesign(designId: $designId) {
      data {
        name
        _id
      }
      status
      message
    }
  }
`;
export const updateDesignMutation = gql`
  mutation updateDesignMutation($designName: String!, $designId: ID!) {
    updateDesign(input: { designId: $designId, name: $designName }) {
      status
      message
      data {
        name
      }
    }
  }
`;
