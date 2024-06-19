export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string
}

export type UserRS = Omit<User, "password">;
