import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  PlayPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from "./pages";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/play/:gameId",
        element: <PlayPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
