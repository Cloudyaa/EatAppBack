import { ErrorResponse } from '../error';

export interface AccountLoginResponse {
  status: number;
  token: string;
  role: string;
  userId: string;
}

export interface AccountLoginDto {
  email: string;
  password: string;
}

export interface AccountSignupDto extends AccountLoginDto {
  confirmPassword: string;
}

export type AccountSignupResponse = ErrorResponse;
