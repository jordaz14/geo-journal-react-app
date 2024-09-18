// Req Payload Types
type User = any;

export interface AuthResponse {
  authenticated: boolean;
  user: User;
}

export interface LoginResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
}

// Res Payload Types
