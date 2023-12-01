import { useMutation } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginAPI({ email, password });
    },
    onSuccess: (user: any) => {
      console.log(user);
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error('Incorrect email or password');
    }
  });

  return { login, isLoading };
}
