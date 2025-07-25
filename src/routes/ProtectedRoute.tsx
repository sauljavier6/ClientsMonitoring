// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = true;

const ProtectedRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;