/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Pagination from "@/lib/Pagination";
import { useGetConfirmedOrdersQuery } from "@/redux/features/dashboard/dashboardApi"; // Assuming the correct API hook
import Loading from "@/app/loading";

export default function CompletedOrdersTable() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data using the Redux Query hook
  const { data, isLoading, error } = useGetConfirmedOrdersQuery({
    page: currentPage,
    limit: rowsPerPage,
  });

  // Handle loading and error states
  if (isLoading) return <Loading />;
  if (error) return <div>Error fetching confirmed orders.</div>;

  // Get the rows and pagination information from the API response
  const confirmedOrders = data?.data?.data || [];
  const totalPages = data?.data?.meta?.totalPages || 1;

  // // Pagination logic
  // const indexOfLast = currentPage * rowsPerPage;
  // const indexOfFirst = indexOfLast - rowsPerPage;
  // const currentRows = confirmedOrders.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-full bg-white rounded-xl p-5 ">
      <h3 className="text-[15px] text-gray-800 mb-4 font-bold">
        Completed Orders
      </h3>

      {/* TABLE WRAPPER */}
      <div className="rounded-xl overflow-hidden border border-[#e5e5e5]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#a39d8d] text-white text-[14px]">
              <th className="py-3 px-5 font-normal">Order ID</th>
              <th className="py-3 px-5 font-normal">Student Name</th>
              <th className="py-3 px-5 font-normal">Teacher Name</th>
              <th className="py-3 px-5 font-normal">Date</th>
              <th className="py-3 px-5 font-normal text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {confirmedOrders?.map((row: any, i: number) => (
              <tr
                key={row.orderId}
                className="border-b border-[#e5e5e5] text-[14px] text-gray-700"
              >
                <td className="py-3 px-5">{i + 1}</td>
                <td className="py-3 px-5">{row.studentName}</td>
                <td className="py-3 px-5">{row.teacherName}</td>
                <td className="py-3 px-5">
                  {new Date(row.createdAt).toLocaleDateString()}{" "}
                  {/* Format the date */}
                </td>
                <td className="py-3 px-5 text-right">
                  <button className="bg-[#d8a21f] hover:bg-[#c8961c] text-white text-[13px] px-4 py-2 rounded-md">
                    Release fund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end mt-4 mb-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
