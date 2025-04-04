import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSuccessStoryApi,
  deleteSuccessStoryApi,
  getAllSuccessStoryApi,
  getSuccessStoryByIdApi,
  updateSuccessStoryApi
} from './success-story.api';
import { toast } from 'sonner';

export const useGetAllSuccessStory = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ['success-story', params],
    queryFn: () => getAllSuccessStoryApi(params)
  });
};

export const useGetSuccessStoryById = (id: string) => {
  return useQuery({
    queryKey: ['success-story', id],
    queryFn: () => getSuccessStoryByIdApi(id),
    enabled: id !== null && id !== 'new'
  });
};

export const useCreateSuccessStory = (onSuccess: Function) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => createSuccessStoryApi(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['success-story'] });
      toast.success(data.message);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
};

export const useUpdateSuccessStory = (
  id: string | undefined,
  onSuccess: Function
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => updateSuccessStoryApi(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['success-story'] });
      queryClient.invalidateQueries({ queryKey: ['success-story', id] });
      toast.success(data.message);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
};

export const useDeleteSuccessStory = (
  id: string | undefined,
  onSuccess: Function
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteSuccessStoryApi(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['success-story'] });
      toast.success(data.message);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
};
