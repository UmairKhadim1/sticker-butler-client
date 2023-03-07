import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  createDesignMutation,
  updateDesignMutation,
  deleteDesignMutation,
} from './design.gql';

/**
 *Provides mutation functions for Designs
 *
 * @returns {Array} the viewer's data
 */
export default function useMutateDesign() {
  const [createDesign, createDesignResponse] =
    useMutation(createDesignMutation);
  const [updateDesign, updateDesignResponse] =
    useMutation(updateDesignMutation);
  const [deleteDesign, deleteDesignResponse] =
    useMutation(deleteDesignMutation);
  return [
    { createDesign, createDesignResponse },
    { updateDesign, updateDesignResponse },
    { deleteDesign, deleteDesignResponse },
  ];
}
