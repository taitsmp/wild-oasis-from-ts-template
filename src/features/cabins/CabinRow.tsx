import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import CreateCabinForm from './CreateCabinForm';
import { useState } from 'react';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discountPrice: number;
    discount: number;
    description: string;
    image: string;
  };
}

export function CabinRow({ cabin }: CabinRowProps) {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  });

  const { id, name, maxCapacity, regularPrice, discountPrice, discount, description, image } =
    cabin;
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => mutate(id)} disabled={isDeleting}>
            Delete
          </button>
          <button onClick={() => setShowForm((show: boolean) => !show)}>Edit</button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm />}
    </>
  );
}
