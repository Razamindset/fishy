import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthLayout = () => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
      return <Navigate to="/" replace />;
    }
  return <Outlet />;
};

export default AuthLayout;
