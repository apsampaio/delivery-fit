import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { decodeToken, isExpired } from "react-jwt";

type AuthContextData = {
  user: UserProps | null;
  loggedIn: boolean;
  api: AxiosInstance;
  AuthAPI: AxiosInstance;
  SignIn: (params: SignInParams) => Promise<void>;
  SignOut: () => void;
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
  const [user, setUser] = useState<null | UserProps>(() => {
    const userExists = localStorage.getItem("DeliveryFIT:user");
    if (!userExists) return null;

    const userData = JSON.parse(userExists) as UserProps;

    if (isExpired(userData.token)) return null;
    return userData;
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const [AuthAPI, setAuthAPI] = useState(() =>
    axios.create({
      baseURL: "http://localhost:3001/",
    })
  );

  const [api, setApi] = useState(() =>
    axios.create({
      baseURL: "http://localhost:3002/",
    })
  );

  useEffect(() => {
    user
      ? (api.defaults.headers.common["Authorization"] = "Bearer " + user.token)
      : (api.defaults.headers.common["Authorization"] = "");

    setLoggedIn(!!user);
  }, [user]);

  const SignIn = async (params: SignInParams) => {
    const response = await AuthAPI.post("sign-in", params);
    const data = decodeToken(response.data) as UserProps;
    const userData = {
      name: data.name,
      nameid: data.nameid,
      exp: data.exp,
      token: response.data,
    };
    setUser(userData);
    localStorage.setItem("DeliveryFIT:user", JSON.stringify(userData));
  };

  const SignOut = () => {
    localStorage.removeItem("DeliveryFIT:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, SignIn, SignOut, api, AuthAPI }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
