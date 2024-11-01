import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Layout from "../layouts/Layout";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LayoutAdmn from "../layouts/LayoutAdmn";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "admin",
    element: <LayoutAdmn />,
    children: [
      {index: true, element: <Dashboard />},
      {path: "category", element: <Category />},
      {path: "product", element: <Product />},
      {path: "manage", element: <Manage />}
    ]
  },
  {
    path: "user",
    element: <LayoutUser />,
    children: [
      {index: true, element: <HomeUser />},
    ]
  },
]);
const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;