import { auth } from "@/lib/auth";
import axios from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
});

instance.interceptors.request.use(
    async (config) => {
        // const session = await auth();
        // if (session) {
        //     config.headers.Authorization = `Bearer ${session?.accessToken}`;
        // }

        return config;
    },
    async (error) => {
        // console.log(error, 'error');
        if (typeof window !== 'undefined') {
            if (
                window.location.pathname !== '/login' &&
                window.location.pathname !== '/forget-password' &&
                window.location.pathname !== '/reset-password' &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                // Handle 401 Unauthorized responses as needed
                // For example, redirect to login page or clear access token
                // Cookies.remove("access_token");
                // window.location.href = "/";
                await signOut({ redirect: false }).then(() => {

                    window.localStorage.clear();
                });
                toast.error('Someone logged in on another system',
                );

                window.location.href = '/';
            }
        }
        return error;
    }
);

export default instance;