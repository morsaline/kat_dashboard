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
import { useState, useMemo } from "react";

export default function RevenueChart() {
  const [range, setRange] = useState("yearly");

  // -------- RAW DATA (1–14 as your screenshot sample) -------- //
  const yearlyData = [
    { name: "Jan", revenue: 420 },
    { name: "Feb", revenue: 430 },
    { name: "Mar", revenue: 400 },
    { name: "Apr", revenue: 820 },
    { name: "May", revenue: 230 },
    { name: "Jun", revenue: 180 },
    { name: "Jul", revenue: 210 },
    { name: "Aug", revenue: 500 },
    { name: "Sep", revenue: 1000 },
    { name: "Oct", revenue: 290 },
    { name: "Nov", revenue: 760 },
    { name: "Dec", revenue: 350 },
  ];

  const monthlyData = [
    { name: "1", revenue: 420 },
    { name: "2", revenue: 430 },
    { name: "3", revenue: 400 },
    { name: "4", revenue: 820 },
    { name: "5", revenue: 230 },
    { name: "6", revenue: 180 },
    { name: "7", revenue: 210 },
    { name: "8", revenue: 500 },
    { name: "9", revenue: 1000 },
    { name: "10", revenue: 290 },
    { name: "11", revenue: 760 },
    { name: "12", revenue: 350 },
    { name: "13", revenue: 20 },
    { name: "14", revenue: 180 },
  ];

  const weeklyData = monthlyData.slice(0, 7); // first 7 days

  // -------- COMPUTE CHART DATA BASED ON SELECTED RANGE -------- //
  const chartData = useMemo(() => {
    if (range === "yearly") return yearlyData;
    if (range === "monthly") return monthlyData;
    if (range === "weekly") return weeklyData;
    return monthlyData;
  }, [range]);

  return (
    <div className="w-full bg-white rounded-xl shadow px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Revenue</h2>

        {/* Select Option */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              formatter={() =>
                range === "yearly" ? "Year Data" : "Current Month"
              }
              wrapperStyle={{ paddingTop: 10 }}
            />
            <Bar dataKey="revenue" fill="#D89407" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
