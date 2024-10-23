import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, PlayPage } from "./pages";
import HeaderWrapper from "./components/shared/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:gameId",
        element: <PlayPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
