import React, { createContext, useContext, useState } from "react";
import { User } from "../types/User";

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider
      value={{ user, login, logout }}
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
