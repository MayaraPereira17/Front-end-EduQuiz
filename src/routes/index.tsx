// src/routes/index.jsx
import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Dashboard } from "../pages/dashboard";
import { Coach } from "../pages/coach";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/coach",
    element: <Coach />,
  },
]);

export default router;
