"use client";
import { useGetTransactionStatsQuery } from "@/redux/features/dashboard/dashboardApi";

export default function TransactionStats() {
  const { data } = useGetTransactionStatsQuery({});
  console.log(data, "tran");
  const stats = data?.data;
  return (
    <div className="w-full max-w-xs mx-auto text-center">
      <div className="flex flex-col gap-4">
        {/* Total Transactions (black card) */}
        <div className="w-full rounded-xl px-4 py-10 bg-[#3b3b3b] text-white">
          <p className="text-sm text-white/80">Total Transactions</p>
          <p className="text-xl font-semibold mt-1">
            ${stats?.totalTransaction.toFixed(2) || 0}
          </p>
        </div>

        {/* Total Refunds (pink card) */}
        <div className="w-full rounded-xl px-4 py-10 bg-[#f7d7d7] border border-[#eac3c3]">
          <p className="text-sm text-gray-700">Total Refunds</p>
          <p className="text-xl font-semibold mt-1 text-gray-900">
            ${stats?.totalRefund.toFixed(2) || 0}
          </p>
        </div>

        {/* Total Pending Funds (white card) */}
        <div className="w-full rounded-xl px-4 py-10 border border-gray-200 bg-white shadow-sm">
          <p className="text-sm text-gray-600">Total Pending funds</p>
          <p className="text-xl font-semibold mt-1 text-gray-800">
            ${stats?.totalPendingFund.toFixed(2) || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
