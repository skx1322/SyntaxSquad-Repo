import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import type { APIResponse } from "../../types/types";
import type { login } from "../../types/user.types";
import userAPI from "../../common/user.api";
import toast from "react-hot-toast";

interface onClick {
  onClickPage: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ onClickPage }: onClick) => {
  const [loginData, setLoginData] = React.useState<login>({
    username: "",
    password_hash: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<APIResponse<string>>(
        `${userAPI.login.link}`,
        {
          username: loginData.username,
          password_hash: loginData.password_hash
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error);
        toast.error(error.response.data.message);
      } else {
        toast.error(`Internal server error.`);
      }
    }
  };

  const changePage = () => {
    onClickPage("register");
  };
  return (
    <section className="bg-background min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            <b className="text-secondary">Log in</b> to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text">
            Login today to get started!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-xl text-gray-700">
                Username or Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="pl-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Username"
                value={loginData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <label htmlFor="password" className="text-xl text-gray-700">
                Password
              </label>
              <input
                id="password_hash"
                name="password_hash"
                type="password"
                required
                className="pl-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Password"
                value={loginData.password_hash}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between gap-2 mt-6">
              <Link
                to={"/"}
                className="text-accent/80 hover:text-accent transform transistion-normal duration-500 hover:underline"
              >
                Activate Account
              </Link>
              <Link
                className="text-accent/80 hover:text-accent transform transistion-normal duration-500 hover:underline"
                to={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-normal duration-500"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="text-center border-t-4 rounded border-gray-500 py-6">
          <p>
            Do not have an account?{" "}
            <b
              onClick={changePage}
              className="text-accent/80 cursor-pointer hover:text-accent transform transistion-normal duration-500 hover:underline"
            >
              Click Here!
            </b>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
