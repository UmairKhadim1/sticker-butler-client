import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  getAddressByAccountId,
  addNewAddressMutation,
  updateAddressMutation,
  deleteAddressMutation,
} from './query.gql';
import auth from '../../auth/auth';

/**
 * Gets current viewer's shopify ordersdata
 *
 * @returns {Array} the shopify orders object  data
 */
export default function useAddress() {
  // @ts-ignore: Unreachable code error
  const authToken =
    typeof window !== 'undefined'
      ? auth.getToken() && auth.getToken().accessToken
      : undefined;
  //fetch address
  const [fetchAddressBook, fetchAddressBookResponse] = useLazyQuery(
    getAddressByAccountId,
    { fetchPolicy: 'network-only' }
  );
  // add new address
  const [addNewAddress, addAddressResponse] = useMutation(
    addNewAddressMutation
  );
  // update address
  const [updateAddress, updateAddressResponse] = useMutation(
    updateAddressMutation
  );

  // delete address
  const [deleteAddress, deleteAddressResponse] = useMutation(
    deleteAddressMutation
  );
  const { data, refetch } = fetchAddressBookResponse;
  // useEffect(() => {
  //   refetch();
  // }, [authToken]);
  useEffect(() => {
    if (!addAddressResponse.loading && addAddressResponse.data) {
      refetch();
    }
  }, [addAddressResponse]);
  useEffect(() => {
    if (!updateAddressResponse.loading && updateAddressResponse.data) {
      refetch();
    }
  }, [updateAddressResponse]);

  // useEffect(() => {
  //   refetch();
  // }, [deleteAddressResponse]);
  return [
    { fetchAddressBook, fetchAddressBookResponse },
    { addNewAddress, addAddressResponse },
    { updateAddress, updateAddressResponse },
    { deleteAddress, deleteAddressResponse },
  ];
}
