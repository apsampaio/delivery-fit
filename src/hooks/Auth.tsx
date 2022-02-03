import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { decodeToken } from "react-jwt";

type AuthContextData = {
  user: UserProps | null;
  loggedIn: boolean;
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

  useEffect(() => {
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
    <AuthContext.Provider value={{ user, loggedIn, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
