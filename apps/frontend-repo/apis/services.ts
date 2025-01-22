import { axiosInstance } from "./axios";
import { usersApis } from "./userApi";

export const services = {
  ...usersApis(axiosInstance),
};
