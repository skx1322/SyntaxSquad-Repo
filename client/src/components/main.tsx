import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#f0f0f0",
            color: "#222021",
          },
          success: {
            duration: 3000,
            style: {
              background: "#07bb9a",
              color: "#f0f0f0",
            },
            iconTheme: {
              primary: "#f0f0f0",
              secondary: "#07bb9a",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#e36666",
              color: "#f0f0f0",
            },
            iconTheme: {
              primary: "#f0f0f0",
              secondary: "#e36666",
            },
          },
        }}
      />
      <Footer></Footer>
    </div>
  );
};

export default Main;
