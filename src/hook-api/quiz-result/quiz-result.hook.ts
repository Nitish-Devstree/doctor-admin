import { useQuery } from '@tanstack/react-query';
import { getAllResultApi } from './quiz-result.api';

export const useGetAllQuizResult = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ['quizRresult', params],
    queryFn: () => getAllResultApi(params)
  });
};
