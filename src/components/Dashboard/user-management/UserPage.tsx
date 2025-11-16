import React from "react";
import UserStats from "./UserStats";
import AllUsersTable from "./AllUsersTable";
import ActiveUsersTableWithPagination from "./ActiveUserTableWithPagination";
import RemovedUserTable from "./RemovedUserTable";

function UserPage() {
  return (
    <div className="p-2">
      {/* Page Header */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Users Management</h1>

      {/* TOP SECTION: Stats + All Users Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats (left) */}
        <div className="col-span-1 flex flex-col gap-4">
          <UserStats />
        </div>

        {/* All Users Table (right) */}
        <div className="col-span-3 overflow-x-auto">
          <div className="min-w-[700px]">
            <AllUsersTable />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Active + Removed Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <ActiveUsersTableWithPagination />
          </div>
        </div>

        {/* Removed Users */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <RemovedUserTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
