// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
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
import { AdminLayout } from "../pages/admin/_layouts/adminLayout";
import { HomeAdmin } from "../pages/admin/tabs/home";
import { ProfileAdminPage } from "../pages/admin/tabs/profile";
import { ReportsAdmin } from "../pages/admin/tabs/reports";
import { RankingAdmin } from "../pages/admin/tabs/ranking";
import { UsersAdmin } from "../pages/admin/tabs/users";
import { QuizAttempt } from "../pages/dashboard/QuizAttempt";
import { QuizResult } from "../pages/dashboard/QuizResult";
import { FootballGame } from "../pages/dashboard/FootballGame";

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
    element: (
      <ProtectedRoute allowedRoles={["2"]}>
        <Register />
      </ProtectedRoute>
    ),
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
    path: "/dashboard/quiz/:quizId",
    element: (
      <ProtectedRoute allowedRoles={["0"]}>
        <QuizAttempt />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/quiz/result/:tentativaId",
    element: (
      <ProtectedRoute allowedRoles={["0"]}>
        <QuizResult />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/football-game",
    element: (
      <ProtectedRoute allowedRoles={["0"]}>
        <FootballGame />
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
      { path: "create-quizz", element: <CreateCoachQuizz /> }, // subrota
      { path: "quizz/edit-quizz", element: <EditCoachQuizz /> }, // subrota
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["2"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <HomeAdmin /> },
      { path: "users", element: <UsersAdmin /> },
      { path: "ranking", element: <RankingAdmin /> },
      { path: "reports", element: <ReportsAdmin /> },
      { path: "profile", element: <ProfileAdminPage /> },
    ],
  },
]);

export default router;
