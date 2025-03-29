import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVideoApi, deleteVideoApi, getAllVideoApi, getVideoById, updateVideoApi } from "./video.api";
import { toast } from "sonner";

export function useGetAllVideo(params: any) {
    return useQuery({
        queryKey: ['video', params],
        queryFn: () => getAllVideoApi(params)
    })
}

export function useGetVideoById(id: string) {
    return useQuery({
        queryKey: ['videoId', id],
        queryFn: () => getVideoById(id),
        enabled: id !== null && id !== 'new'
    })
}

export const useCreateVideo = (resetForm: Function) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => createVideoApi(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['video'] })
            resetForm()
            toast.success(data.message)
        },
        onError: (data) => {
            console.log(data)
            toast.error(JSON.stringify(data.message))
        }
    })
}

export const useUpdateVideo = (id: string | undefined, resetForm: Function) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => updateVideoApi(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['videoId', id] })
            queryClient.invalidateQueries({ queryKey: ['video'] })
            resetForm()
            toast.success(data.message)
        },
        onError: (data) => {
            console.log(data)
            toast.error(JSON.stringify(data.message))
        }
    })
}

export function useDeleteVideo(onSuccess: Function) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteVideoApi(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['video'] })
            onSuccess()
            toast.success(data.message)
        },
        onError: (data) => {
            console.log(data)
            toast.error(JSON.stringify(data.message))
        }
    })
}