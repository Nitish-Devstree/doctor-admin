import API from '../../instance/api';
import instance from '../../instance/intance';
import { paramsToQueryString } from '../../lib/utils';

export const getAllUserApi = async (params: Record<string, any>) => {
  const queryString = paramsToQueryString(params);
  const response = await instance.get(API.user.getAllUsers + queryString);
  return response.data.data;
};

export const getUserByIdApi = async (id: string | null) => {
  const response = await instance.get(API.user.getUserById + `/${id}`);
  return response.data.data;
};

export const updateUserByIdApi = async (
  id: string | undefined,
  payload: FormData
) => {
  const response = await instance.put(
    API.user.updateUserById + `/${id}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};
