/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Pagination from "@/lib/Pagination";
import { useGetCancelledOrdersQuery } from "@/redux/features/dashboard/dashboardApi";
import Loading from "@/app/loading";

export default function CancelledOrdersTable() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data using the Redux Query hook
  const { data, isLoading, error } = useGetCancelledOrdersQuery({
    page: currentPage,
    limit: rowsPerPage,
  });

  // Get the rows and pagination information from the API response
  const cancelledOrders = data?.data?.data || [];
  const totalPages = data?.data?.meta?.totalPages || 1;

  // Pagination logic
  // const indexLast = currentPage * rowsPerPage;
  // const indexFirst = indexLast - rowsPerPage;
  // const currentRows = cancelledOrders.slice(indexFirst, indexLast);

  // Handle loading and error
  if (isLoading) return <Loading/>;
  if (error) return <div>Error fetching cancelled orders.</div>;
  return (
    <div className="w-full bg-[#f4eddc] rounded-xl p-5 shadow-sm mt-5">
      <h3 className="text-[15px] text-gray-800 mb-4 font-bold">
        Cancelled orders
      </h3>

      {/* TABLE */}
      <div className="rounded-xl overflow-hidden border border-[#e0d7c3]">
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

          <tbody className="bg-[#f4eddc]">
            {cancelledOrders?.map((row: any, index: number) => (
              <tr
                key={row.orderId} // Use a unique identifier like orderId for the key
                className="border-b border-[#e0d7c3] text-[14px] text-gray-700"
              >
                <td className="py-3 px-5">{index + 1}</td>
                <td className="py-3 px-5">{row.studentName}</td>
                <td className="py-3 px-5">{row.teacherName}</td>
                <td className="py-3 px-5">
                  {new Date(row.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 text-right">
                  <button className="bg-[#e74c3c] hover:bg-[#cf4436] text-white text-[13px] px-4 py-2 rounded-md">
                    Refund
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
