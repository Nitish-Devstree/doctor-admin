import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUniversityApi,
  deleteUniversity,
  getUniversitiesApi,
  getUniversityById,
  updateUniversity
} from './university.api';
import { toast } from 'sonner';

interface GetUniversitiesParams {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
}

export function useGetUniversities(params: GetUniversitiesParams = {}) {
  return useQuery({
    queryKey: ['universities', params],
    queryFn: () => getUniversitiesApi(params)
  });
}

export function useGetUniversityById(id: string) {
  return useQuery({
    queryKey: ['university', id],
    queryFn: () => getUniversityById(id),
    enabled: id !== null && id !== 'new'
  });
}

export function useCreateUniversity(redirectForm: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => createUniversityApi(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
      queryClient.invalidateQueries({ queryKey: ['active-countries'] });
      redirectForm();
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(JSON.stringify(data.message));
    }
  });
}

export function useDeleteUniversity(onSuccess: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUniversity(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
      queryClient.invalidateQueries({ queryKey: ['active-countries'] });
      onSuccess();
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(JSON.stringify(data.message));
    }
  });
}
export function useUpdateUniversity(
  id: string | undefined,
  onSuccess: Function
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => updateUniversity(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
      queryClient.invalidateQueries({ queryKey: ['university', id] });
      queryClient.invalidateQueries({ queryKey: ['active-countries'] });
      onSuccess();
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(JSON.stringify(data.message));
    }
  });
}
