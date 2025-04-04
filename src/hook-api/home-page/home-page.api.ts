import API from '@/instance/api';
import instance from '@/instance/intance';

export const getHomePageApi = async () => {
  const response = await instance.get(API.homePage.getAll);
  return response.data.data;
};

export const updateHomePageApi = async (data: FormData) => {
  const response = await instance.put(API.homePage.update, data);
  return response.data;
};

export const deleteHomePageApi = async () => {
  const response = await instance.delete(API.homePage.delete);
  return response.data;
};
