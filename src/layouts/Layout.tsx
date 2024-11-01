import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div>
      <MainNav />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
