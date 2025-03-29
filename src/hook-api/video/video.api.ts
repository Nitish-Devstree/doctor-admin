import API from "@/instance/api";
import instance from "@/instance/intance";
import { paramsToQueryString } from "@/lib/utils";

export async function getAllVideoApi(params: any) {
    const queryString = paramsToQueryString(params);

    const response = await instance.get(API.video.getALl + queryString)
    return response.data.data

}

export async function getVideoById(id: string) {
    const response = await instance.get(API.video.getById + "/" + id)
    return response.data.data

}
export async function createVideoApi(payload: any) {
    const response = await instance.post(API.video.create, payload)
    return response.data
}

export async function updateVideoApi(id: string | undefined, payload: any) {
    const response = await instance.put(API.video.create + '/' + id, payload)
    return response.data

}

export async function deleteVideoApi(id: string) {
    const response = await instance.delete(API.video.create + "/" + id)
    return response.data

}