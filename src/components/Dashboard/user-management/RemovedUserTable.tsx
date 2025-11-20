/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/app/loading";
import Pagination from "@/lib/Pagination";
import { useGetUsersQuery } from "@/redux/features/users/usersApi";
import { useState } from "react";

export default function RemovedUserTable() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data using the Redux Query hook
  const { data, isLoading, error } = useGetUsersQuery({
    page: currentPage,
    limit: rowsPerPage,
    removed: true, // Filter for removed users
  });

  // --- Handle Loading and Error States ---
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading removed users.</div>;

  // Pagination data from API response
  const totalPages = data?.data?.meta?.totalPages || 1; // Correcting totalPages access
  const displayedRows = data?.data?.data || []; // Users data from API response

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-5 bg-red-200">
      <h3 className="text-[16px] text-gray-800 mb-3">Removed Users</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white">
            <th className="py-3 px-4 text-left rounded-tl-lg">Sl. No.</th>
            <th className="py-3 px-4 text-left">User Name</th>
            <th className="py-3 px-4 text-left rounded-tr-lg">Email</th>
          </tr>
        </thead>

        <tbody>
          {displayedRows.map((row: any, i: number) => (
            <tr key={i} className="bg-red-200 border-b border-black">
              <td className="py-3 px-4">{row.serial}</td>
              <td className="py-3 px-4">{row.fullName}</td>
              <td className="py-3 px-4">{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
