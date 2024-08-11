import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (t: string) => void;
    logout: () => void;
    token?: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [token, setToken] = useState('');

  function login(t: string) {
      setIsAuthenticated(true);
      setToken(t);
  };
  function logout() {
      setIsAuthenticated(false);
      setToken('');
  };  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth tem que ser usado com um AuthProvider')
  return context;
}
