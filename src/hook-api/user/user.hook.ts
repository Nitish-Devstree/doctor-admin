import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllUserApi, getUserByIdApi, updateUserByIdApi } from './user.api';
import { toast } from 'sonner';

export const useGetAllUsers = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getAllUserApi(params)
  });
};

export const useGetUserById = (id: string | null) => {
  return useQuery({
    queryKey: ['userId', id],
    queryFn: () => getUserByIdApi(id),
    enabled: id !== null && id !== 'new'
  });
};

export const useUpdateUserById = (
  id: string | undefined,
  resetForm: Function
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => updateUserByIdApi(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userId', id] });
      resetForm();
      toast.success(data.message);
    },
    onError: (data) => {
      // console.log(data);
      toast.error(JSON.stringify(data.message));
    }
  });
};
