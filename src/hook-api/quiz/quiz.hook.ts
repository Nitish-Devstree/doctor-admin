import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createQuizApi,
  deleteQuizApi,
  getALlQuizApi,
  getQuizByIdApi,
  toggleQuizStatusApi,
  updateQuizApi
} from './quiz.api';
import { toast } from 'sonner';

export const useGetAllQuiz = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ['quiz', params],
    queryFn: () => getALlQuizApi(params)
  });
};

export const useGetQuizById = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuizByIdApi(id),
    enabled: id !== null && id !== 'new'
  });
};
export const useCreateQuiz = (onSuccess: Function) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => createQuizApi(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      toast.success(data.message);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
};

export const useUpdateQuiz = (id: string | undefined, onSuccess: Function) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => updateQuizApi(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      queryClient.invalidateQueries({ queryKey: ['quiz', id] });
      toast.success(data.message);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
};

export const useDeleteQuiz = (id: string | undefined, onSuccess: Function) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteQuizApi(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      toast.success(data.message);
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  });
};

export const useToggleQuizStatus = (
  id: string | undefined,
  onSuccess?: Function
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => toggleQuizStatusApi(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      queryClient.invalidateQueries({ queryKey: ['quiz', id] });
      toast.success(data.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
};
