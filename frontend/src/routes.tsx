// import path from "path";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default routes;
