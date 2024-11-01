import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div>
      <h1>main</h1>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
