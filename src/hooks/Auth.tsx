import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios, { AxiosInstance } from "axios";
import { decodeToken } from "react-jwt";

type AuthContextData = {
  user: UserProps | null;
  loggedIn: boolean;
  api: AxiosInstance;
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
  const [user, setUser] = useState<null | UserProps>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [api, setApi] = useState(() =>
    axios.create({
      baseURL: "http://localhost:3000/",
    })
  );

  useEffect(() => {
    user
      ? (api.defaults.headers.common["Authorization"] = "Bearer " + user.token)
      : (api.defaults.headers.common["Authorization"] = "");

    setLoggedIn(!!user);
  }, [user]);

  const SignIn = async (params: SignInParams) => {
    const response = await api.post("auth/sign-in", params);
    if (response.status !== 200) throw new Error();

    const data = decodeToken(response.data.token) as UserProps;

    setUser({
      name: data.name,
      nameid: data.nameid,
      exp: data.exp,
      token: response.data.token,
    });
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, SignIn, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
