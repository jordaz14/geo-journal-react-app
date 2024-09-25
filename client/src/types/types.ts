/* RESPONSE TYPES */
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

export type Entry = {
  created_at: string;
  location: { location_lat: null | number; location_lng: null | number };
  message: string;
  user: { username: string };
};

export interface LocationResponse {
  isLocation: boolean;
  isEntry: boolean;
  entry: Entry[];
}

export interface EntryResponse {
  message: string;
}

export type UserLocationResponse = Location[];

export interface Location {
  user_id: number;
  owner_id: number;
  location_id: number;
  location_param: string;
  location_lat: number;
  location_lng: number;
  fe_entry_id: number;
  fe_message: string;
  fe_message_date: string;
  ne_entry_id: number;
  ne_message: string;
  total_entry_count: number;
}
/*FORM TYPES*/

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
