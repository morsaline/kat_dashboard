"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1", revenue: 60 },
  { name: "2", revenue: 60 },
  { name: "3", revenue: 110 },
  { name: "4", revenue: 70 },
  { name: "5", revenue: 75 },
  { name: "6", revenue: 80 },
  { name: "7", revenue: 45 },
  { name: "8", revenue: 50 },
  { name: "9", revenue: 85 },
  { name: "10", revenue: 80 },
];

export default function RevenueChart() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Revenue</h2>
      <div className="h-[275px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
