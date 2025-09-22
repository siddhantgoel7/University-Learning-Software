import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = { children: React.ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if ((user as any).role && (user as any).role !== "professor") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
