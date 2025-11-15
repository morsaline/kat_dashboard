/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useGetDashboardQuery } from "@/redux/features/user/userApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimePeriod = "daily" | "weekly" | "monthly" | "all";

export default function RevenueChart() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("daily");

  // Fetch dashboard data based on selected timePeriod
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardQuery({
    timePeriod,
  });

  // Map API data to chart data
  const chartData = useMemo(() => {
    if (!dashboardData?.data?.revenueGraph) return [];
    // Reverse to show chronological order (optional)
    return [...dashboardData.data.revenueGraph].reverse().map((item: any) => ({
      name: item.period,
      revenue: item.revenue,
    }));
  }, [dashboardData]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Revenue</h2>

      <div className="flex justify-end">
        {" "}
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
          className="border border-gray-300 text-base rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all">Yearly</option>
        </select>
      </div>

      <div className="h-[275px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#b2f7f5"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <Tooltip cursor={{ fill: "#fff" }} />
            <Bar
              dataKey="revenue"
              fill="#b2f7f5"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
