import { useEffect, useMemo, useCallback, useState } from 'react';
import { useLazyQuery, useMutation, useApolloClient } from '@apollo/client';

import { userLoginMutation } from './mutations.gql';
// import {
//   accountCartByAccountIdQuery,
//   anonymousCartByCartIdQuery,
// } from './queries.gql';
// import { GQL_URL } from '../../apiConfig';

/**
 * Hook to get cart information
 *
 * @returns {Object} the user's current cart
 */

const useSignin = async (user: any) => {
  const [loginUser] = useMutation(userLoginMutation, {
  
  });
  return await loginUser(user);
};
export default useSignin;
