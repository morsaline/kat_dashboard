"use client";

import { useState } from "react";
import Pagination from "@/lib/Pagination";

export default function CompletedOrdersTable() {
  const allRows = [
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0002",
      studentName: "Farhan",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0003",
      studentName: "Rafi",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0004",
      studentName: "Siam",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0005",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0006",
      studentName: "Jamil",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0007",
      studentName: "Shuvo",
      teacherName: "Mobin",
      date: "02/12/25",
    },
  ];

  const itemsPerPage = 4;

  // ---- PAGINATION STATE ---- //
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allRows.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentRows = allRows.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-[15px] text-gray-800 mb-4 font-bold">
        Completed orders
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
            {currentRows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#e5e5e5] text-[14px] text-gray-700"
              >
                <td className="py-3 px-5">{row.orderId}</td>
                <td className="py-3 px-5">{row.studentName}</td>
                <td className="py-3 px-5">{row.teacherName}</td>
                <td className="py-3 px-5">{row.date}</td>
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
