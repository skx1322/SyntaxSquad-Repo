import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Toaster from "react-hot-toast";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Header></Header>
      <Outlet/>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#6692e3",
            color: "#FFFFFF",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <Footer></Footer>
    </div>
  );
}

export default App;
