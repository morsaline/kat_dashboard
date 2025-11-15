/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import RevenueChart from "./RevenueChart";
import ProductTable from "./ProductTable";
import { useGetDashboardQuery } from "@/redux/features/user/userApi";

function DashboardOverview() {
  const { data, isLoading, isError } = useGetDashboardQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load dashboard data.</p>;

  const overview = data?.data?.overview || {};
  const users = data?.data?.userList || [];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* --- Overview Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <div className="border rounded-md px-4 py-6 flex justify-center items-center">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-500 font-bold">
              Total Revenue
            </p>
            <p className="text-lg sm:text-2xl font-semibold text-green-500">
              ${overview.totalRevenue || 0}
            </p>
          </div>
        </div>

        {/* Total Users */}
        <div className="border rounded-md px-4 py-6 flex justify-center items-center">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-500 font-bold">
              Total Users
            </p>
            <p className="text-lg sm:text-2xl font-semibold text-gray-800">
              {overview.totalUsers || 0}
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="border rounded-md px-4 py-6 flex justify-center items-center">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-500 font-bold">
              Total Products
            </p>
            <p className="text-lg sm:text-2xl font-semibold text-gray-800">
              {overview.totalProducts || 0}
            </p>
          </div>
        </div>
      </div>

      {/* --- Revenue Chart & Users Table --- */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <RevenueChart />
        </div>

        {/* Users Table */}
        <div className="w-full lg:w-1/3 max-h-[330px] overflow-auto">
          <table className="w-full text-left border border-gray-200">
            <thead>
              <tr className="bg-[#b2f7f5] text-gray-700 text-sm">
                <th className="py-2 px-4 font-medium">User Name</th>
                <th className="py-2 px-4 font-medium">User Email</th>
                <th className="py-2 px-4 font-medium">Location</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {users.map((user: any, i: number) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-2 px-4">{user.usersName}</td>
                  <td className="py-2 px-4">{user.userEmail}</td>
                  <td className="py-2 px-4">{user.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Product Table --- */}
      <ProductTable />
    </div>
  );
}

export default DashboardOverview;
