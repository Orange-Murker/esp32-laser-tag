import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import GameDashboard from "./pages/GameDashboard";
import Users from "./pages/Users";
import { AuthProvider } from "./hooks/useAuth";
import { requireAuth } from "./components/requireAuth";
import { CreateGame } from "./pages/CreateGame";
import { UserDetails } from "./pages/UserDetails";
import { CreateUser } from './pages/CreateUser';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: requireAuth(<GameDashboard />),
  },
  {
    path: "/users",
    element: requireAuth(<Users />),
  },
  {
    path: "/users/new",
    element: requireAuth(<CreateUser />),
  },
  {
    path: "/users/:username",
    element: requireAuth(<UserDetails />),
  },
  {
    path: "/games/new",
    element: requireAuth(<CreateGame />),
  },
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
