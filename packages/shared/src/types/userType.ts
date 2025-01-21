export type UserData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserPayload = {
  name: string;
  email: string;
  avatar: string;
};
