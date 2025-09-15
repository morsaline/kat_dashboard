"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface VisitorData {
  date: string;
  count: number;
}

interface RevenueChartProps {
  data: VisitorData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Map API data to the format recharts expects
  const chartData = data.map((item) => ({
    date: item.date.slice(5), // format "MM-DD" for X-axis
    visitors: item.count,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="visitors"
            fill="#60A5FA"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
