import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  });

  return { isDeleting, deleteCabin };
}
