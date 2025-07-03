import { config as envConfig } from '@/utils/envHelper';

// Define the user structure
export interface User {
  username: string;
  password: string;
  role: string;
}

// ✅ Pull login credentials from .env (via envHelper)
export const validUser: User = {
  username: envConfig.username,
  password: envConfig.password,
  role: 'standard',
};

// Hardcoded wrong user (for negative test cases)
export const invalidUser: User = {
  username: 'wrong_user',
  password: 'wrong_password',
  role: 'guest',
};