import { createBrowserRouter } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";
import { RegisterPage } from "@/pages/RegisterPage.tsx";

export const Router = createBrowserRouter([
  {
    path: "/schedule",
    element: <CalendarPage />,
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
