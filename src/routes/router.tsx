import { createBrowserRouter } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";
import { RegisterPage } from "@/pages/RegisterPage.tsx";
import { Navigate } from "react-router";
import { PrivateRoute } from "@/routes/PrivateRoute.tsx";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/schedule"} />,
  },

  {
    path: "/schedule",
    element: (
      <PrivateRoute>
        <CalendarPage />
        </PrivateRoute>
    ),
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
