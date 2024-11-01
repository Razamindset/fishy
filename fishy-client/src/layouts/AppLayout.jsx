import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Header from "../components/shared/Header";

const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();

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
