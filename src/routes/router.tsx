import { createBrowserRouter } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage.tsx";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <CalendarPage />,
  },
]);
