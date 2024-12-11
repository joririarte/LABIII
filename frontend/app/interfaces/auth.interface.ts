export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_name: string;
  '.issued': string;
  '.expires': string;
}

export interface IEvent {
  event: {} | string;
  id?: string;
}

export class AuthData {
  token?: string;
  isAuthenticated: boolean = false;
}
