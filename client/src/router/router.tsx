import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Course from "../pages/course";
import Account from "../pages/account";
import About from "../pages/about";
import Detail from "../pages/detail";
import Auth from "../hook/auth";
import Dashboard from "../pages/dashboard";
import Main from "../components/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/catalog",
        element: <Course/>
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/course/:courseID",
        element: <Detail />,
      },
      {
        path: "/dashboard",
        element: <Auth />,
        children: [
            {index: true, element: <Dashboard />}
        ]
      },
    ],
  },
]);

export default router;
