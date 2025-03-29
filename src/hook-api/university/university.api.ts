import API from '@/instance/api';
import instance from '@/instance/intance';
import { paramsToQueryString } from '@/lib/utils';

interface GetUniversitiesParams {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
}

export async function getUniversitiesApi(params: GetUniversitiesParams = {}) {
    const queryString = paramsToQueryString(params);

    const response = await instance.get(API.university.getAllUniversity + queryString);
    return response.data.data;
}
export async function getUniversityById(id: string) {
    const response = await instance.get(API.university.getUniversity + "/" + id)
    return response.data.data
}

export async function createUniversityApi(payload: any) {
    const response = await instance.post(API.university.createUniversity, payload)
    return response.data
}
export async function deleteUniversity(id: string) {
    const response = await instance.delete(API.university.deleteUniversity + "/" + id)
    return response.data

}

export async function updateUniversity(id: string | undefined, payload: FormData) {
    const response = await instance.put(API.university.updateUniversity + '/' + id, payload)
    return response.data

}