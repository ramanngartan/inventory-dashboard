import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-black shadow-md"
        : "hover:bg-slate-800 text-slate-300"
    }`;

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col justify-between">

      <div>

        <div className="text-2xl font-bold p-6 border-b border-slate-800">
          InventoryPro
        </div>

        <nav className="mt-6 px-3 space-y-2">

          <NavLink to="/dashboard" className={navLinkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            <Package size={20} />
            Products
          </NavLink>

          <NavLink to="/users" className={navLinkClass}>
            <Users size={20} />
            Users
          </NavLink>

          <NavLink to="/analytics" className={navLinkClass}>
            <BarChart3 size={20} />
            Analytics
          </NavLink>

          <NavLink to="/settings" className={navLinkClass}>
            <Settings size={20} />
            Settings
          </NavLink>

        </nav>

      </div>

      <div className="border-t border-slate-800 p-6">
        <p className="font-semibold">
          {user?.name || "Guest"}
        </p>

        <p className="text-sm text-slate-400">
          {user?.role || ""}
        </p>
      </div>

    </aside>
  );
}