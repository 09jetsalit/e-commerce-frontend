import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setupAxiosInterceptors from "./utils/axiosSetup";

const App = () => {

  useEffect(() => {
    setupAxiosInterceptors();
  }, [])
  
  return (
    <>
    <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
