import { ENV } from "@/configs/env";
import { getCookies } from "@/utils/serverActions";
import axios, { AxiosError, AxiosInstance } from "axios";

function defaultRequestInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const [sessionTokenCookie] = await getCookies(["session_token"]);
      if (config.headers !== undefined) {
        config.headers.set("x-client-id", ENV.CLIENT_ID);
        if (sessionTokenCookie?.value) {
          config.headers.set(
            "Authorization",
            `Bearer ${sessionTokenCookie.value || ""}`
          );
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function defaultResponseInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const customError = {
        ...error,
        message: error.message || "",
        statusCode: error.response?.status || 400,
      };

      return Promise.reject(customError);
    }
  );
}

function createAxios() {
  const axiosInstance = axios.create();

  defaultRequestInterceptor(axiosInstance);
  defaultResponseInterceptor(axiosInstance);

  return axiosInstance;
}

export const axiosInstance = createAxios();
