import { createBrowserRouter } from "react-router";
import LoggedUserLayout from "@/layouts/LoggedUserLayout";
import { HomeScreen } from "@/pages/home-screen";

export const router = createBrowserRouter([
  {
    element: <LoggedUserLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
]);