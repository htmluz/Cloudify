import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (spotify_access_token: string, spotify_id: string) => void;
    logout: () => void;
    spotify_access_token?: string;
    spotify_id?: string;
    setSpotifyTokenOnly: (t: string) => void;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [spotify_access_token, setSpotify_Access_Token] = useState('');
  const [spotify_id, setSpotify_id] = useState('');

  useEffect(() => {
    const stored_spotify_token = localStorage.getItem('spotify_access_token');
    const stored_spotify_id = localStorage.getItem('spotify_id')
    
    if (stored_spotify_token && stored_spotify_id) {
      setIsAuthenticated(true);
      setSpotify_Access_Token(stored_spotify_token);
      setSpotify_id(stored_spotify_id);
    }
  }, [])

  function login(spotify_access_token: string, spotify_id: string) {
      setIsAuthenticated(true);
      setSpotify_Access_Token(spotify_access_token);
      setSpotify_id(spotify_id)

      localStorage.setItem('spotify_access_token', spotify_access_token);
      localStorage.setItem('spotify_id', spotify_id);
  };
  function logout() {
      setIsAuthenticated(false);
      setSpotify_Access_Token('');
      setSpotify_id('');

      localStorage.clear();
  };  
  function setSpotifyTokenOnly(t: string) {
      setSpotify_Access_Token(t) 
      localStorage.setItem('spotify_access_token', t)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, spotify_access_token, spotify_id, setSpotifyTokenOnly}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth tem que ser usado com um AuthProvider')
  return context;
}
