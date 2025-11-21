"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import Loading from "@/app/loading";

export default function RevenueChart() {
  const { data, isLoading } = useGetDashboardStatsQuery({});

  // Extract monthly data and month name from the response
  const month = data?.data?.data?.month || "Unknown Month";
  const dailyOrders = data?.data?.data?.dailyOrders || [];

  // Prepare the chart data based on daily orders
  const chartData = dailyOrders.map(
    (order: { day: number; amount: number }) => ({
      name: `${order.day}`, // Display day number
      revenue: order.amount, // Revenue for the day
    })
  );
  if (isLoading) return <Loading />;
  return (
    <div className="w-full bg-white rounded-xl shadow px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{month}</h2>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#D89407" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
