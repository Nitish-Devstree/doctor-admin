import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createScholarshipApi, deleteScholarshipApi, getAllScholarshipApi, getScholarshipByIdApi, updateScholarshipApi } from "./scholarship.api"
import { toast } from "sonner"

export const useGetAllScholarship = (params: Record<string, any>) => {
    return useQuery({
        queryKey: ['scholarship', params],
        queryFn: () => getAllScholarshipApi(params)
    })
}

export const useGetScholarshipById = (id: string) => {
    return useQuery({
        queryKey: ['scholarship', id],
        queryFn: () => getScholarshipByIdApi(id),
        enabled: id !== null && id !== 'new'
    })
}

export const useCreateScholarship = (onSuccess: Function) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: any) => createScholarshipApi(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['scholarship'] })
            toast.success(data.message)
            onSuccess()
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useUpdateScholarship = (id: string | undefined, onSuccess: Function) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: any) => updateScholarshipApi(id, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['scholarship'] })
            queryClient.invalidateQueries({ queryKey: ['scholarship', id] })
            toast.success(data.message)
            onSuccess()
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useDeleteScholarship = (id: string | undefined, onSuccess: Function) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteScholarshipApi(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['scholarship'] })
            toast.success(data.message)
            onSuccess()
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })
}