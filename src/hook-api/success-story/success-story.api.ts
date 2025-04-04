import API from '@/instance/api';
import instance from '@/instance/intance';
import { paramsToQueryString } from '@/lib/utils';

export async function getAllSuccessStoryApi(params: Record<string, any>) {
  const queryString = paramsToQueryString(params);
  const response = await instance.get(API.successStory.getAll + queryString);
  return response.data.data;
}

export async function createSuccessStoryApi(payload: FormData) {
  const response = await instance.post(API.successStory.create, payload);
  return response.data;
}

export async function getSuccessStoryByIdApi(id: string) {
  const response = await instance.get(API.successStory.getById + '/' + id);
  return response.data.data;
}

export async function updateSuccessStoryApi(
  id: string | undefined,
  payload: FormData
) {
  const response = await instance.patch(
    API.successStory.update + '/' + id,
    payload
  );
  return response.data;
}

export async function deleteSuccessStoryApi(id: string | undefined) {
  const response = await instance.delete(API.successStory.delete + '/' + id);
  return response.data;
}
