export type UserData = {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};

export type RegisterUserPayload = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type UpdateUserPayload = {
  name: string;
  email: string;
  avatar: string;
};
