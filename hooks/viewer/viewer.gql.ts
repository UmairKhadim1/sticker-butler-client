import { gql } from '@apollo/client';
export const viewerQuery = gql`
  query {
    getUser {
      _id
      store
      name
      email
      profilePhoto
      addressBook {
        _id
        address1
        address2
        city
        state
        zipCode
      }
    }
  }
`;
