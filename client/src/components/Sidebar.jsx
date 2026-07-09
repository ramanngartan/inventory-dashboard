import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { use, useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx"



export default function Sidebar() {

  const { user } = useContext(AuthContext);


  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col justify-between">

      <div>

        <div className="text-2xl font-bold p-6 border-b border-slate-800">
          InventoryPro
        </div>

        <nav className="mt-6 px-3">

            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive
                        ? "bg-blue-100 text-black shadow-md"
                        : "hover:bg-slate-800 text-slate-300"
                    }`
                }
            >
                <LayoutDashboard size={20} />
                Dashboard
            </NavLink>

          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
          >
            <Package size={20} />
            Products
          </a>

          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
          >
            <Users size={20} />
            Users
          </a>

          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
          >
            <BarChart3 size={20} />
            Analytics
          </a>

          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
          >
            <Settings size={20} />
            Settings
          </a>

        </nav>

      </div>

      <div className="border-t border-slate-800 p-6">
        <p className="font-semibold">{user?.name || "Guest"}</p>
        <p className="text-sm text-slate-400">{user?.role || ""}</p>
      </div>

    </aside>
  );
}