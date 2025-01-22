import { ErrorResponse as ErrResponse } from "@repo/shared/src/types/apis.js";
import { AxiosError } from "axios";

type SuccessResponseProps<T> = {
  data: T;
  message: string;
};

type ErrorResponseProps = {
  error: Error | unknown;
  message?: string;
};

export function APIErrorResponse({ error, message }: ErrorResponseProps) {
  if (error instanceof AxiosError) {
    const err = error as AxiosError<ErrResponse>;
    return {
      success: false,
      message: message ?? err.response?.data.message,
      data: null,
      error: err.response?.data.error,
    };
  }

  return {
    success: false,
    message: message ?? (error as Error).message,
    data: null,
    error,
  };
}

export function APISuccessResponse<
  T extends Record<string, any> = Record<string, any>,
>({ data, message }: SuccessResponseProps<T>) {
  return {
    success: true,
    message: message,
    data,
    error: null,
  };
}
