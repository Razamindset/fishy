import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Header from "../components/shared/Header";
import useLatency from "../utils/hooks/useLatency";

const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();

  useLatency();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
