// Response Types
type User = any;

export interface AuthResponse {
  authenticated: boolean;
  user: User;
}

export interface LoginResponse {
  message: string;
  isLoggedIn: boolean;
  user: User;
}

export interface RegisterResponse {
  message: string;
  isRegistered: boolean;
}

type entry = [{}];

export interface LocationResponse {
  isLocation: boolean;
  isEntry: boolean;
  entry: entry;
}

export interface EntryResponse {
  message: string;
}
