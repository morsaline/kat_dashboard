/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/app/loading";
import Pagination from "@/lib/Pagination";
import { useGetSkillsCategoryQuery } from "@/redux/features/skills/skillsApi";
import { useState} from "react";

export default function AllSkillsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch skills data using the Redux Query hook
  const { data, isLoading, isError } = useGetSkillsCategoryQuery({
    page: currentPage,
    limit: rowsPerPage,
  });

  // Handle loading and error states
  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div>Error fetching skills!</div>;
  }

  const skills = data?.data?.data || []; // Skills data from API
  const totalPages = data?.data?.meta.totalPages || 1; // Total pages from API meta

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* Title */}
      <h3 className="text-[16px] text-gray-700 mb-3 font-medium">All Skills</h3>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white text-[14px]">
            <th className="py-3 px-4 text-left rounded-tl-md">Skill Name</th>
            <th className="py-3 px-4 text-left">Orders</th>
            {/* <th className="py-3 px-4 text-left rounded-tr-md">Action</th> */}
          </tr>
        </thead>

        <tbody>
          {skills.map((row: any, i: number) => (
            <tr
              key={i}
              className="bg-white border-b border-gray-300 text-[14px]"
            >
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">{row.orders}</td>

              {/* <td className="py-3 px-4">
                <button className="bg-red-600 text-white text-[13px] px-4 py-1.5 rounded">
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
