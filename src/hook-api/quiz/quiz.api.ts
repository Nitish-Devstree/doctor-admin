import API from "@/instance/api";
import instance from "@/instance/intance";

export async function getALlQuizApi() {
    const response = await instance.get(API.quiz.all)
    return response.data.data
}

export async function createQuizApi(payload: FormData) {
    const response = await instance.post(API.quiz.all, payload)
    return response.data

}

