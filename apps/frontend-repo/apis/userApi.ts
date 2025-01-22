import { ENV } from "@/configs/env";
import {
  RegisterUserPayload,
  UpdateUserPayload,
  UserData,
} from "@repo/shared/src/types/userType.js";
import {
  BaseIdResponse,
  SuccessResponse,
} from "@repo/shared/src/types/apis.js";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { APIErrorResponse, APISuccessResponse } from "@/utils/apis";

type RegisterUserProps = {
  data: RegisterUserPayload;
  config?: AxiosRequestConfig;
};

type GetUserByIdProps = {
  params: {
    id: string;
  };
  config?: AxiosRequestConfig;
};

type UpdateUserByIdProps = {
  params: {
    id: string;
  };
  data: UpdateUserPayload;
  config?: AxiosRequestConfig;
};

export function usersApis(
  httpClient: AxiosInstance,
  baseUrl = ENV.NEXT_PUBLIC_BACKEND_SERVICE_URL
) {
  return {
    registerUser: async ({ data, config }: RegisterUserProps) => {
      try {
        const targetUrl = `${baseUrl}/v1/users`;
        const res = await httpClient.post<BaseIdResponse>(
          targetUrl,
          data,
          config
        );
        return APISuccessResponse({
          message: res.data.message,
          data: res.data.data,
        });
      } catch (error) {
        return APIErrorResponse({ error });
      }
    },
    getUserById: async ({ params: { id }, config }: GetUserByIdProps) => {
      try {
        const targetUrl = `${baseUrl}/v1/users/${id}`;
        const res = await httpClient.get<SuccessResponse<UserData>>(
          targetUrl,
          config
        );
        return APISuccessResponse({
          message: res.data.message,
          data: res.data.data,
        });
      } catch (error) {
        return APIErrorResponse({ error });
      }
    },
    updateUserById: async ({
      params: { id },
      data,
      config,
    }: UpdateUserByIdProps) => {
      try {
        const targetUrl = `${baseUrl}/v1/users/${id}`;
        const res = await httpClient.put<SuccessResponse<UserData>>(
          targetUrl,
          data,
          config
        );
        return APISuccessResponse({
          message: res.data.message,
          data: res.data.data,
        });
      } catch (error) {
        return APIErrorResponse({ error });
      }
    },
  };
}
