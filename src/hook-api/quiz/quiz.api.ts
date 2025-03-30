import API from "@/instance/api";
import instance from "@/instance/intance";
import { paramsToQueryString } from "@/lib/utils";

export async function getALlQuizApi(params: Record<string, any>) {
    const queryString = paramsToQueryString(params);
    const response = await instance.get(API.quiz.all + queryString);
    return response.data.data
}

export async function createQuizApi(payload: FormData) {
    const response = await instance.post(API.quiz.all, payload)
    return response.data

}


export async function getQuizByIdApi(id: string) {
    const response = await instance.get(API.quiz.all + '/' + id)
    return response.data.data
}

export async function updateQuizApi(id: string | undefined, payload: FormData) {
    const response = await instance.put(API.quiz.all + "/" + id, payload)
    return response.data
}

export async function deleteQuizApi(id: string | undefined) {
    const response = await instance.delete(API.quiz.all + "/" + id)
    return response.data
}

export async function toggleQuizStatusApi(id: string | undefined, payload: any) {
    const response = await instance.put(API.quiz.all + "/result/" + id , payload)
    return response.data
}