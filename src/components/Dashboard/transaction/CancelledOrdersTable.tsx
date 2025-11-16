"use client";

import { useState } from "react";
import Pagination from "@/lib/Pagination";

export default function CancelledOrdersTable() {
  const allRows = [
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
    {
      orderId: "0001",
      studentName: "Tanvir",
      teacherName: "Mobin",
      date: "02/12/25",
    },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allRows.length / itemsPerPage);

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;

  const currentRows = allRows.slice(indexFirst, indexLast);

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
            {currentRows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#e0d7c3] text-[14px] text-gray-700"
              >
                <td className="py-3 px-5">{row.orderId}</td>
                <td className="py-3 px-5">{row.studentName}</td>
                <td className="py-3 px-5">{row.teacherName}</td>
                <td className="py-3 px-5">{row.date}</td>
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
