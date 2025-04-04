import API from '@/instance/api';
import instance from '@/instance/intance';
import { paramsToQueryString } from '@/lib/utils';

export async function getAllScholarshipApi(params: Record<string, any>) {
  const queryString = paramsToQueryString(params);
  const response = await instance.get(API.scholarship.getAll + queryString);
  return response.data.data;
}

export async function createScholarshipApi(payload: FormData) {
  const response = await instance.post(API.scholarship.create, payload);
  return response.data;
}

export async function getScholarshipByIdApi(id: string) {
  const response = await instance.get(API.scholarship.getById + '/' + id);
  return response.data.data;
}

export async function updateScholarshipApi(
  id: string | undefined,
  payload: FormData
) {
  const response = await instance.patch(
    API.scholarship.update + '/' + id,
    payload
  );
  return response.data;
}

export async function deleteScholarshipApi(id: string | undefined) {
  const response = await instance.delete(API.scholarship.delete + '/' + id);
  return response.data;
}
