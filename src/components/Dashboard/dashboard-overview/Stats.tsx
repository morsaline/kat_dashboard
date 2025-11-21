"use client";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";

export default function Stats() {
  const { data } = useGetDashboardStatsQuery({});
  const stats = data?.data?.stats;
  return (
    <div className="w-full max-w-xs mx-auto text-center">
      <div className="flex flex-col gap-4">
        {/* Total Revenue (Highlighted Card) */}
        <div className="w-full rounded-xl px-4 py-10 bg-neutral-800 text-white">
          <p className="text-sm text-white/70">Total Revenue</p>

          <p className="text-xl font-semibold mt-1">
            {stats?.totalRevenue.toFixed(2) || 0}
          </p>
        </div>

        {/* Total Refund */}
        {/* <div className="w-full rounded-xl px-4 py-10 border border-gray-200 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Refund</p>
          <p className="text-xl font-semibold mt-1 text-gray-800">$148</p>
        </div> */}

        {/* Total Users */}
        <div className="w-full rounded-xl px-4 py-10 border border-gray-200 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total users</p>
          <p className="text-xl font-semibold mt-1 text-gray-800">
            {stats?.totalUsers || 0}
          </p>
        </div>

        {/* Active Users */}
        <div className="w-full rounded-xl px-4 py-10 border border-gray-200 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Active users</p>
          <p className="text-xl font-semibold mt-1 text-gray-800">
            {" "}
            {stats?.totalActiveUsers || 0}
          </p>
        </div>

        {/* Top Skills */}
        <div className="w-full rounded-xl px-4 py-10 border border-gray-200 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Top skills</p>
          <p className="text-xl font-semibold mt-1 text-gray-800">
            {" "}
            {stats?.totalTopSkills || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
