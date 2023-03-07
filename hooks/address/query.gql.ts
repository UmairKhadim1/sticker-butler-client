import { gql } from '@apollo/client';
export const getAddressByAccountId = gql`
  query {
    getAddressByAccountId {
      _id
      address1
      address2
      city
      state
      zipCode
    }
  }
`;
export const addNewAddress = gql`
  mutation addNewAddress(
    $address1: String!
    $address2: String
    $city: String!
    $state: String!
    $zipCode: String!
  ) {
    addAccountAddressBookEntry(
      input: {
        address1: $address1
        address2: $address2
        city: $city
        state: $state
        zipCode: $zipCode
      }
    ) {
      status
      message
    }
  }
`;

export const addNewAddressMutation = gql`
  mutation addNewAddress(
    $address1: String!
    $address2: String
    $city: String!
    $state: String!
    $zipCode: String!
  ) {
    addAccountAddressBookEntry(
      input: {
        address1: $address1
        address2: $address2
        city: $city
        state: $state
        zipCode: $zipCode
      }
    ) {
      status
      message
    }
  }
`;
export const updateAddressMutation = gql`
  mutation updateAddress(
    $id: String!
    $address1: String!
    $address2: String
    $city: String!
    $state: String!
    $zipCode: String!
  ) {
    updateAccountAddressBookEntry(
      input: {
        _id: $id
        address1: $address1
        address2: $address2
        city: $city
        state: $state
        zipCode: $zipCode
      }
    ) {
      status
      message
    }
  }
`;
export const deleteAddressMutation = gql`
  mutation deleteAddressMutation($id: String!) {
    deleteAccountAddressBookEntry(input: { _id: $id }) {
      status
      message
    }
  }
`;
