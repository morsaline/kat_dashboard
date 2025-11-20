/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/app/loading";
import Pagination from "@/lib/Pagination";
import { useGetSkillsQuery } from "@/redux/features/skills/skillsApi";
import { useState, useEffect } from "react";

export default function AllCategoriesTable() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data using the Redux Query hook
  const { data, isLoading, isError } = useGetSkillsQuery({
    page: currentPage,
    limit: rowsPerPage,
  });

  // Handle loading and error states
  const categories = data?.data?.tables?.categories.data || [];
  const totalPages = data?.data?.tables?.categories.meta.totalPages || 1;

  // Pagination logic
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Ensure currentPage is initialized before passing to API
  useEffect(() => {
    if (currentPage) {
      // Optional: You can log or perform other actions here for debugging
    }
  }, [currentPage]);

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div>Error fetching categories!</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* Title */}
      <h3 className="text-[16px] text-gray-700 mb-3 font-medium">
        All Categories
      </h3>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white text-[14px]">
            <th className="py-3 px-4 text-left rounded-tl-md">Name</th>
            <th className="py-3 px-4 text-left">Sub-categories</th>
            <th className="py-3 px-4 text-left">Skills</th>
            <th className="py-3 px-4 text-left">Orders</th>
            {/* <th className="py-3 px-4 text-left rounded-tr-md">Action</th> */}
          </tr>
        </thead>

        <tbody>
          {categories.map((row: any, i: number) => (
            <tr
              key={i}
              className="bg-white border-b border-gray-300 text-[14px]"
            >
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">{row.subCategories}</td>
              <td className="py-3 px-4">{row.skills}</td>
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
