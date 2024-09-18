import { createContext, ReactNode, useEffect, useState } from "react";
import { serverUrl, fetchData, postData } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/types";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // AUTHORIZE USER ON APP LOAD
  useEffect(() => {
    fetchData(`${serverUrl}/auth`).then((response: AuthResponse) => {
      console.log(response);

      // If authenticated, populate user data
      if (response.authenticated) {
        setUser(response.user);
      }

      setLoading(false);
    });
  }, []);

  // HANDLE USER LOGIN
  const login = async (formData: any) => {
    console.log("Attempting login");

    postData(`${serverUrl}/login`, formData).then((response) => {
      console.log(response);

      // If logged in, populate user data & redirect to /account
      if (response.isLoggedIn) {
        setUser(response.user);
        navigate("/account");
      }

      return response;
    });
  };

  // HANDLE USER LOGOUT
  const logout = async () => {
    console.log("Attempting logout");

    postData(`${serverUrl}/logout`).then((response) => {
      console.log(response);
      setUser(null);
      navigate("/session");
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
