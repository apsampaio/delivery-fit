import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  SignIn: (params: SignInParams) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type SignInParams = {
  username: string;
  password: string;
};

type UserProps = {
  name: string;
  nameid: string;
  token: string;
  exp: number;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserProps);

  const SignIn = async (params: SignInParams) => {
    const response = await api.post("auth/sign-in", params);
    if (response.status !== 200) throw new Error();

    const decoded = jwt.decode(response.data.token) as UserProps;

    setUser({
      name: decoded.name,
      nameid: decoded.nameid,
      exp: decoded.exp,
      token: response.data.token,
    });
  };

  return (
    <AuthContext.Provider value={{ user, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
