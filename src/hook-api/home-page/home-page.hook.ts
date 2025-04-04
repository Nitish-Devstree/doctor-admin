import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteHomePageApi,
  getHomePageApi,
  updateHomePageApi
} from './home-page.api';
import { toast } from 'sonner';

export const useGetHomePage = () => {
  return useQuery({
    queryKey: ['homePage'],
    queryFn: () => getHomePageApi()
  });
};

export const useUpdateHomePage = (onSuccess: Function) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => updateHomePageApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ['homePage'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  });
};

export const useDeleteHomePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteHomePageApi(),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['homePage'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  });
};
