import { NavLink } from "react-router-dom";
import { LayoutPanelLeft } from "lucide-react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="bg-red-400 w-60 text-green-200 flex flex-col h-screen">
      <div className="h-24 bg-purple-500 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to={"/admin"} end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center"
              : "text-green-500 px-4 py-2 hover:bg-green-200 hover:text-white rounded flex items-center"
          }
        >
          <LayoutPanelLeft />
          Dashboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center"
              : "text-green-500 px-4 py-2 hover:bg-green-200 hover:text-white rounded flex items-center"
          }
        >
          <LayoutPanelLeft />
          Manage
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center"
              : "text-green-500 px-4 py-2 hover:bg-green-200 hover:text-white rounded flex items-center"
          }
        >
          <LayoutPanelLeft />
          Category
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center"
              : "text-green-500 px-4 py-2 hover:bg-green-200 hover:text-white rounded flex items-center"
          }
        >
          <LayoutPanelLeft />
          Product
        </NavLink>

      </nav>

      <footer>
      <NavLink
          to={"login"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 flex items-center"
              : "text-green-500 px-4 py-2 hover:bg-green-200 hover:text-white rounded flex items-center"
          }
        >
          <LayoutPanelLeft />
          Login
        </NavLink>
      </footer>
    </div>
  );
};

export default Sidebar;
