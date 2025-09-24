import axios from "axios";
import * as React from "react";
import { Navigate, Outlet } from "react-router";
import userAPI from "../common/user.api";
import type { APIResponse } from "../types/types";

const Auth = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(true); 

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get<APIResponse<{isAuth: boolean}>>(`${userAPI.auth.link}`, { withCredentials: true });
        const data = response.data;
        if (data.output?.isAuth) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuth === null) {
    return <div>Checking authentication...</div>;
  }

  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/account" />;
  }
};

export default Auth;
