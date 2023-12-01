import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/router.tsx";

import "./css/main.css";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Provider } from "jotai";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <Toaster />
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>,
);
