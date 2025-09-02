import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx"
import Home from "../pages/home.jsx";
import Course from "../pages/course.jsx";
import Account from "../pages/account.jsx";
import About from "../pages/about.jsx";
import Detail from "../pages/detail.jsx";
import Auth from "../hook/auth.jsx";
import Dashboard from "../pages/dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
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
        path: "/course-detail/:courseID",
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
