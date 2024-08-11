import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

type UnauthorizedProps = { children: ReactNode }

export default function Unauthorized({ children }: UnauthorizedProps) {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? children : <Navigate to={'/login'} replace />;
}
