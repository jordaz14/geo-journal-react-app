import { createContext, ReactNode, useEffect, useState } from "react";
import { serverUrl, fetchData, postData } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { AuthResponse, LoginResponse } from "../types/types";

interface AuthContextType {
  user: string | null;
  login: (formData: any) => Promise<{ response: LoginResponse }>;
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
    const response: LoginResponse = await postData(
      `${serverUrl}/login`,
      formData
    );

    // If logged in, populate user data & return response
    if (response.isLoggedIn) {
      setUser(response.user);
      return { response };
    }

    // Else, return response
    return { response };
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
