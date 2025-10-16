// src/routes/index.jsx
import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Dashboard } from "../pages/dashboard";
import { ProfileCoach } from "../pages/coach/tabs/profile";
import { MyQuizzesCoach } from "../pages/coach/tabs/myQuizzes";
import { CoachLayout } from "../pages/coach/_layouts/coachLayout";
import { CreateCoachQuizz } from "../pages/createCoachQuizz";
import { HomeCoach } from "../pages/coach/tabs/home";
import { EditCoachQuizz } from "../pages/editCoachQuizz";
import { Register } from "../pages/register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminDashboard } from "../pages/admin";

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
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["0"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coach",
    element: (
      <ProtectedRoute allowedRoles={["1"]}>
        <CoachLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <HomeCoach /> }, // aba Home
      { path: "quizz", element: <MyQuizzesCoach /> }, // aba Quizzes
      { path: "profile", element: <ProfileCoach /> }, // aba Profile
      { path: "quizz/create-quizz", element: <CreateCoachQuizz /> }, // subrota
      { path: "quizz/edit-quizz", element: <EditCoachQuizz /> }, // subrota
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["2"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
