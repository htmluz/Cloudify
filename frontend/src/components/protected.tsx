import { ReactNode } from "react";
import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedProps = { children: ReactNode }

export default function Protected({ children }: ProtectedProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation().pathname;

  return isAuthenticated ? children : <Navigate to={'/login'} state={{ from: location }} replace />;
}

