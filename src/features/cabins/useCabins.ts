import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export const useCabins = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  });

  return {
    isLoading,
    error,
    cabins: data
  };
};
