import { createContext, ReactNode, useEffect, useState } from "react";
import { serverUrl, fetchData, postData } from "../utils/fetch";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Attempting auth-status");
      fetchData(`${serverUrl}/auth`).then((response) => {
        console.log(response);
        if (response.authenticated) {
          setUser(response.user);
        }
        setLoading(false);
      });
    };

    checkAuth();
  }, []);

  const login = async (formData: any) => {
    console.log("Attempting login");
    postData(`${serverUrl}/login`, formData).then((response) => {
      console.log(response);
      if (response.isLoggedIn) {
        setUser(response.user);
        navigate("/account");
      }
      return response;
    });
  };

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
