import React from "react";
import TransactionStats from "./transactionStats";
import CompletedOrdersTable from "./CompletedOrdersTable";
import CancelledOrdersTable from "./CancelledOrdersTable";

function Transaction() {
  return (
    <div className="p-2">
      {/* PAGE HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Transactions Management
      </h1>

      {/* TOP SECTION — Stats + Completed Orders */}
      <div className="flex flex-col md:flex-col lg:flex-row gap-6 mb-8 w-full m-5">
        {/* Stats */}
        <div
          className="
          w-full 
          md:w-[40%]      /* 👈 Fix for 770–859px */
          lg:w-[25%] 
          xl:w-[20%]
          flex flex-col gap-4
        "
        >
          <TransactionStats />
        </div>

        {/* Completed Orders Table */}
        <div
          className="
          w-full
          md:w-[100%]      /* 👈 Fix for 770–859px */
          lg:w-[75%]
          xl:w-[80%]
          overflow-x-auto
        "
        >
          <div
            className="
            min-w-[420px]    /* 👈 Same logic */
          md:min-w-[500px]
          lg:min-w-[650px]
          "
          >
            <CompletedOrdersTable />
          </div>
        </div>
      </div>

      {/* Cancelled Orders Table */}
      <div className="w-full overflow-x-auto">
        <div
          className="
          min-w-[420px]    /* 👈 Same logic */
          md:min-w-[500px]
          lg:min-w-[650px]
        "
        >
          <CancelledOrdersTable />
        </div>
      </div>
    </div>
  );
}

export default Transaction;
