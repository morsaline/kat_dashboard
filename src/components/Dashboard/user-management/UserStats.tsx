export default function UserStats() {
  return (
    <div className="w-full max-w-xs mx-auto text-center">
      <div className="flex flex-col gap-4">
        {/* Total Transactions (black card) */}
        <div className="w-full rounded-xl px-4 py-10 bg-[#3b3b3b] text-white">
          <p className="text-sm text-white/80">Total Users</p>
          <p className="text-xl font-semibold mt-1">$1248</p>
        </div>

        {/* Total Pending Funds (white card) */}
        <div className="w-full rounded-xl px-4 py-10 border border-gray-200 bg-white shadow-sm">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-xl font-semibold mt-1 text-gray-800">124</p>
        </div>
      </div>
      {/* Total Refunds (pink card) */}
      <div className="w-full rounded-xl px-4 py-10 bg-[#f7d7d7] border border-[#eac3c3] mt-5">
        <p className="text-sm text-gray-700">Removed Users</p>
        <p className="text-xl font-semibold mt-1 text-gray-900">148</p>
      </div>
    </div>
  );
}
