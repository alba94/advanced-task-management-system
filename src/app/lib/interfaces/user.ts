export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string
}

export type UserRS = Omit<User, "password">;
