import * as React from "react";
import axios from "axios";
import { Link } from "react-router";
import toast from "react-hot-toast";

interface onClick {
  onClickPage: React.Dispatch<React.SetStateAction<string>>;
}

const Register = ({ onClickPage }: onClick) => {
  const [registerData, SetRegisterData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    SetRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error(`Password does not match confirm password!`);
      return;
    }
    const response = await axios.post("", registerData, {
      withCredentials: true,
    });
    if (response.data.success) {
    }
  };

  const changePage = () => {
    onClickPage("login");
  };

  return (
    <section className="bg-background min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            <b className="text-secondary">Register</b> to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text">
            Create account today to get started!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-xl text-gray-700">
                Usernam
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="pl-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Username"
                value={registerData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label htmlFor="email" className="text-xl text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="pl-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Email"
                value={registerData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label htmlFor="password" className="text-xl text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="pl-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Password"
                value={registerData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label
                htmlFor="confirmPassword"
                className="text-xl text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="pl-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between gap-2 mt-6">
              <Link to={"/"} className="text-accent/80 hover:text-accent transform transistion-normal duration-500 hover:underline">
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
              Register
            </button>
          </div>
        </form>
        <div className="text-center border-t-4 rounded border-gray-500 py-6">
          <p>
            Already have an account?{" "}
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

export default Register;
