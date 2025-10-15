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
    element: <CoachLayout />,
    children: [
      { path: "", element: <HomeCoach /> }, // aba Home
      { path: "quizz", element: <MyQuizzesCoach /> }, // aba Quizzes
      { path: "profile", element: <ProfileCoach /> }, // aba Profile
      { path: "quizz/create-quizz", element: <CreateCoachQuizz /> }, // subrota
    ],
  },
]);

export default router;
