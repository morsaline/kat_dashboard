import React from "react";
import Stats from "./Stats";
import RevenueChart from "./RevenueChart";

import ActiveUsersTableWithPagination from "../user-management/ActiveUserTableWithPagination";

function DashboardOverview() {
  return (
    <div className="p-2">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 w-full m-5">
        {/* LEFT — Stats Section */}
        <div
          className="
            w-full
            md:w-[100%]
            lg:w-[25%]
            xl:w-[20%]
            flex flex-col gap-4
          "
        >
          <Stats />
        </div>

        {/* RIGHT — Chart + Table */}
        <div
          className="
            w-full
            md:w-[100%]
            lg:w-[75%]
            xl:w-[80%]
            flex flex-col gap-6
          "
        >
          {/* Chart */}
          <div className="w-full overflow-x-auto">
            <RevenueChart />
          </div>

          {/* Active Users Table */}
          <div className="w-full overflow-x-auto">
            {/* <ActiveUsersTable /> */}
            <ActiveUsersTableWithPagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
