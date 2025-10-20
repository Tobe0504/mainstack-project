import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import AppContextProvider from "./context/AppContext";
import AuthUserContextProvider from "./context/AuthUserContext";
import { ToastProvider } from "./context/ToastContext";
import NotFoundPage from "./components/pages/404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <ToastProvider>
        <AuthUserContextProvider>
          <RouterProvider router={router} />
        </AuthUserContextProvider>
      </ToastProvider>
    </AppContextProvider>
  </StrictMode>
);
