import API from '@/instance/api';
import instance from '@/instance/intance';
import { paramsToQueryString } from '@/lib/utils';

export const getAllResultApi = async (params: Record<string, any>) => {
  const queryString = paramsToQueryString(params);

  const response = await instance.get(API.quizResult.getAll + queryString);
  return response.data.data;
};
