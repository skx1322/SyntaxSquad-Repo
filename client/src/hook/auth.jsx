import axios from "axios";
import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const [isAuth, setIsAuth] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(``, { withCredentials: true });
        const data = response.data;
        if (data.output.isAuthorized) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error(error);
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
    return <Navigate to="account" />;
  }
};

export default Auth;
