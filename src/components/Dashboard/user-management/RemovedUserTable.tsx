"use client";

import Pagination from "@/lib/Pagination";
import { useState } from "react";

export default function RemovedUserTable() {
  const rows = [
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
    },
    {
      sl: "0002",
      name: "Rakib",
      email: "rakib@example.com",
    },
    {
      sl: "0003",
      name: "Siam",
      email: "siam@example.com",
    },
    {
      sl: "0004",
      name: "Hasib",
      email: "hasib@example.com",
    },
    {
      sl: "0005",
      name: "Imran",
      email: "imran@example.com",
    },
    {
      sl: "0006",
      name: "Sakib",
      email: "sakib@example.com",
    },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const displayedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          {displayedRows.map((row, i) => (
            <tr key={i} className="bg-red-200 border-b border-black">
              <td className="py-3 px-4">{row.sl}</td>
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        {" "}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
