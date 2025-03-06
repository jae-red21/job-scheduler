import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import axios, { AxiosError } from "axios";

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return
      }
      try {
        const response = await axios.get('http://localhost:8000/api/auth/verify', {
          headers:{
            "Authorization" : `Bearer ${token}`
          }
        });

        if (response.data) {
          setUser(response.data.user)
        }

      } catch(error) {
        const axiosError = error as AxiosError;
              if (axiosError.response) {
                console.error("Server Response:", axiosError.response.data); // Log 
                setUser(null)
              }
      } finally {
        setLoading(false)
      }
    }

    verifyUser();
  }, [])

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider
      value={{ user,loading, login, logout }}
    >
        {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}

export default AuthProvider;
