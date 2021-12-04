import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

interface AuthContextState {
  token: TokenState;
  signIn: ({ userName, userPassword }: UserData) => Promise<void>;
  logOut: () => void;
  userLogged(): boolean;
  isLogged: boolean;
}

interface UserData {
  userName: string;
  userPassword: string;
}

interface AuthProviderProps {
  children: React.ReactElement
}

interface TokenState {
  jwtToken: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<TokenState>(() => {
    const jwtToken = localStorage.getItem("@CustomerManager:token");

    if(jwtToken){
      api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      setIsLogged(true);

      return {jwtToken};
    }

    return {} as TokenState;
  });

  const signIn = useCallback(async ({ userName, userPassword }: UserData) => {

    const response = await api.post('/auth/login',
      { userName, userPassword }
    );

    const token = response.data as TokenState;

    setToken(token);
    setIsLogged(true);

    localStorage.setItem("@CustomerManager:token", token.jwtToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${token.jwtToken}`;
  }, []);

  const logOut = () => {
    setToken({} as TokenState);
    setIsLogged(false);

    api.defaults.headers.common['Authorization'] = "";

    localStorage.removeItem("@CustomerManager:token");
  }

  const userLogged = useCallback(() => {
    const token = localStorage.getItem("@CustomerManager:token");

    if(token){
      return true;
    }

    return false;
  }, []);


  return (
    <AuthContext.Provider
      value={{ token, isLogged, signIn, userLogged, logOut}}
    >
      {
        children
      }
    </AuthContext.Provider>
  );
}

function useAuth() : AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider }