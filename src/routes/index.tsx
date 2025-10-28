import { createBrowserRouter } from "react-router";
import LoggedUserLayout from "@/layouts/LoggedUserLayout";
import { HomeScreen } from "@/pages/home-screen";
import { LoginPage } from "@/pages/login";
import { RegistrationPage } from "@/pages/registration-page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <LoggedUserLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "cadastro",
        element: <RegistrationPage />,
      },
    ],
  },
]);