"use client";

import React from "react";

const StaticOrdersStats = () => {
  return (
    <div className=" my-5">
      <h1 className="text-xl font-bold">Orders Manageement</h1>
      <div className="flex gap-3 w-full mt-3">
        {" "}
        {/* Active (Teal) */}
        <div className="border border-gray-200 rounded-md px-6 py-3 w-full text-center bg-[#b2f7f5]">
          <p className="text-gray-700 text-sm font-bold">Total Orders</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">1248</p>
        </div>
        {/* White Boxes */}
        <div className="border border-gray-200 rounded-md px-6 py-3 w-full text-center bg-[#b2f7f5]">
          <p className="text-gray-700 text-sm font-bold">Completed</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">248</p>
        </div>
        <div className="border border-gray-200 rounded-md px-6 py-3 w-full text-center bg-[#b2f7f5]">
          <p className="text-gray-700 text-sm font-bold">Pending</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">24</p>
        </div>
        <div className="border border-gray-200 rounded-md px-6 py-3  w-full text-center bg-[#b2f7f5]">
          <p className="text-gray-700 text-sm font-bold">Cancelled</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">12</p>
        </div>
        <div className="border border-gray-200 rounded-md px-6 py-3 w-full  text-center bg-[#b2f7f5]">
          <p className="text-gray-700 text-sm font-bold">Active</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">12</p>
        </div>
      </div>
    </div>
  );
};

export default StaticOrdersStats;
