export type BaseResponse = {
  success: boolean;
  message: string;
};

export type BaseIdResponse = BaseResponse & {
  data: {
    id: string;
  };
};

export type ErrorResponse<T = Record<string, any>> = BaseResponse & {
  error: T;
};

export type SuccessResponse<
  T extends Record<string, unknown> = Record<string, unknown>,
> = BaseResponse & {
  data: T;
};
