export default function SkillsStats() {
  return (
    <div className="w-full max-w-xs mx-auto text-center">
      <div className="flex flex-col gap-4">
        {/* Top Skills (black card) */}
        <div className="w-full rounded-xl px-4 py-6 bg-[#3b3b3b] text-white">
          <p className="text-sm text-white/80">Top Skills</p>
          <p className="text-2xl font-semibold mt-1">48</p>
        </div>

        {/* Total Categories */}
        <div className="w-full rounded-xl px-4 py-6 bg-white border border-gray-300">
          <p className="text-sm text-gray-600">Total Categories</p>
          <p className="text-2xl font-semibold mt-1 text-gray-800">14</p>
        </div>

        {/* Total Sub-categories */}
        <div className="w-full rounded-xl px-4 py-6 bg-white border border-gray-300">
          <p className="text-sm text-gray-600">Total Sub-categories</p>
          <p className="text-2xl font-semibold mt-1 text-gray-800">24</p>
        </div>

        {/* Total Skills */}
        <div className="w-full rounded-xl px-4 py-6 bg-white border border-gray-300">
          <p className="text-sm text-gray-600">Total Skills</p>
          <p className="text-2xl font-semibold mt-1 text-gray-800">148</p>
        </div>
      </div>
    </div>
  );
}
