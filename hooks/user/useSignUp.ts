import { useEffect, useMemo, useCallback, useState } from 'react';
import { useLazyQuery, useMutation, useApolloClient } from '@apollo/client';

import { createUserMutation } from './mutations.gql';
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
export default function useSignUp(user: any) {
  const [createUserMutationFunc, { loading }] = useMutation(
    createUserMutation,
    {
      onCompleted() {
      },
    }
  );
  const signUpUser = async (user: any) => {
    // TEMP delete `addressName` prop until API supports it.
    const data = await createUserMutationFunc({
      variables: {
        input: user,
      },
    });

    return data;
  };

  return [signUpUser, loading];
}
