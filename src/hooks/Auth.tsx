import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios, { AxiosInstance } from "axios";
import { decodeToken, isExpired } from "react-jwt";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps | null;
  loggedIn: boolean;
  api: AxiosInstance;
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
  const [api, setApi] = useState(() =>
    axios.create({
      baseURL: "http://localhost:3000/",
    })
  );

  const [connection, setConnection] = useState<null | HubConnection>(null);

  useEffect(() => {
    user
      ? (api.defaults.headers.common["Authorization"] = "Bearer " + user.token)
      : (api.defaults.headers.common["Authorization"] = "");

    setLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    if (!!user && !connection) {
      setConnection(() =>
        new HubConnectionBuilder()
          .withUrl("http://localhost:3000/chat")
          .withAutomaticReconnect()
          .build()
      );
    } else if (!user && connection) {
      setConnection(null);
    }
  }, [user]);

  useEffect(() => {
    if (connection) {
      connection.on("package-update", (...data) => {
        console.log(...data);
      });

      connection.start();
    }
  }, [connection]);

  const SignIn = async (params: SignInParams) => {
    try {
      const response = await api.post("auth/sign-in", params);
      const data = decodeToken(response.data.token) as UserProps;
      const userData = {
        name: data.name,
        nameid: data.nameid,
        exp: data.exp,
        token: response.data.token,
      };
      setUser(userData);
      localStorage.setItem("DeliveryFIT:user", JSON.stringify(userData));
    } catch (error) {}
  };

  const SignOut = () => {
    localStorage.removeItem("DeliveryFIT:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, SignIn, SignOut, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
