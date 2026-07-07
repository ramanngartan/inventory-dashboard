import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-8">

      <h1 className="text-3xl font-bold text-slate-800">
        Inventory Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-3">

          <Search size={18} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-64"
          />

        </div>

        <Bell
          size={22}
          className="text-slate-600 cursor-pointer hover:text-black transition"
        />

        <div className="flex items-center gap-2 cursor-pointer">

          <UserCircle2
            size={34}
            className="text-slate-700"
          />

          <span className="font-medium">
            Guest
          </span>

        </div>

      </div>

    </header>
  );
}