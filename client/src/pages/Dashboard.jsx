import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";

import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <main className="flex-1 p-10 bg-slate-100">

        <div className="space-y-8">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Overview
            </h2>

            <p className="text-slate-500 mt-2">
              Monitor your inventory, users and sales.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">

            <StatCard
              title="Products"
              value="128"
              icon={Package}
              color="bg-blue-100"
              iconColor="text-blue-600"
            />

            <StatCard
              title="Users"
              value="24"
              icon={Users}
              color="bg-green-100"
              iconColor="text-green-600"
            />

            <StatCard
              title="Revenue"
              value="$12.5K"
              icon={DollarSign}
              color="bg-purple-100"
              iconColor="text-purple-600"
            />

            <StatCard
              title="Orders"
              value="54"
              icon={ShoppingCart}
              color="bg-orange-100"
              iconColor="text-orange-600"
            />

          </div>

        </div>

      </main>
    </DashboardLayout>
  );
};

export default Dashboard;