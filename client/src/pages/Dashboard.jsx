
import { useEffect, useState } from "react";
import api from "../services/api.js";

import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";

import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalValue: 0,
    totalCategories: 0,
  })

  async function fetchStats() {

    try {

      const response = await api.get("/dashboard/stats");

      setStats(response.data);

    }

    catch (err) {

      console.log(err);

    }

  }

  useEffect(() => {
    fetchStats();
  }, []);


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
              value={stats.totalProducts}
              icon={Package}
              color="bg-blue-100"
              iconColor="text-blue-600"
            />

            <StatCard
              title="Categories"
              value={stats.totalCategories}
              icon={Users}
              color="bg-green-100"
              iconColor="text-green-600"
            />

            <StatCard
              title="Value"
              value={`$${stats.totalValue.toLocaleString()}`}
              icon={DollarSign}
              color="bg-purple-100"
              iconColor="text-purple-600"
            />

            <StatCard
              title="Stock"
              value={stats.totalStock}
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