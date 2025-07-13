import React from "react";
import { useAuthStore } from "../../../store/authStore";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/auth/sign-in"} replace />;
  }

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={async () => logout()}>Logout</button>
    </div>
  );
};

export default ProfilePage;
