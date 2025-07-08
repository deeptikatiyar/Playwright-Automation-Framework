import { config as envConfig } from '@/utils/envHelper';

// Define the user structure
export interface LoginUser {
  username: string;
  password: string;
  role: string;
}

//  Pull login credentials from .env (via envHelper)
export const validUser: LoginUser = {
  username: envConfig.username,
  password: envConfig.password,
  role: 'standard',
};

// Hardcoded wrong user (for negative test cases)
export const invalidUser: LoginUser = {
  username: 'wrong_user',
  password: 'wrong_password',
  role: 'guest',
};

export type Company = {
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  company: Company;
  
};
