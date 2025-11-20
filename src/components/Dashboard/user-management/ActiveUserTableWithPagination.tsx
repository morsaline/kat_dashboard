/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/app/loading";
import Pagination from "@/lib/Pagination";
import { useGetUsersQuery } from "@/redux/features/users/usersApi";
import { useState, useEffect } from "react";

export default function ActiveUsersTableWithPagination() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data using the Redux Query hook
  const { data, isLoading, error } = useGetUsersQuery({
    page: currentPage,
    limit: rowsPerPage,
    removed: false, // Filter for active users
  });

  // Pagination info from the response
  const totalPages = data?.data?.meta?.totalPages || 1; // Total pages from the API response

  // Get the active users from the response
  const displayedRows = data?.data?.data || [];

  // Effect to handle page changes (when currentPage is updated)
  useEffect(() => {
    if (data?.data?.meta?.page !== currentPage) {
      setCurrentPage(data?.data?.meta?.page || 1); // Sync current page with API response
    }
  }, [data, currentPage]);

  // Handle data loading and error
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading users.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 bg-green-200 p-5">
      <h3 className="text-[16px] text-gray-800 mb-3">Active Users</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-black">
            <th className="py-3 px-4 text-left rounded-tl-lg">Sl. No.</th>
            <th className="py-3 px-4 text-left">User Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            {/* <th className="py-3 px-4 text-left">Student</th>
            <th className="py-3 px-4 text-left rounded-tr-lg">Teacher</th> */}
          </tr>
        </thead>

        <tbody>
          {displayedRows.map((row: any) => (
            <tr key={row.id} className="bg-green-200 border-b border-black">
              <td className="py-3 px-4">{row.serial}</td>
              <td className="py-3 px-4">{row.fullName}</td>
              <td className="py-3 px-4">{row.email}</td>
              {/* <td className="py-3 px-4">
                {row.student ? (
                  <CircleCheck size={18} />
                ) : (
                  <CircleCheck size={18} className="opacity-50" />
                )}
              </td>
              <td className="py-3 px-4">
                {row.teacher ? (
                  <CircleCheck size={18} />
                ) : (
                  <CircleCheck size={18} className="opacity-50" />
                )}
              </td> */}
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
