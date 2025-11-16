"use client";
import Pagination from "@/lib/Pagination";
import { CircleCheck } from "lucide-react";

import { useState } from "react";

export default function AllUsersTable() {
  const rows = [
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: true,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: true,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
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
    <div className="w-full max-w-6xl mx-auto mt-8">
      <h3 className="text-[16px] text-gray-700 mb-3 font-medium">All Users</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white text-[14px]">
            <th className="py-3 px-4 text-left rounded-tl-md">Sl. No.</th>
            <th className="py-3 px-4 text-left">User Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Student</th>
            <th className="py-3 px-4 text-left">Teacher</th>
            <th className="py-3 px-4 text-left rounded-tr-md">Action</th>
          </tr>
        </thead>

        <tbody>
          {displayedRows.map((row, i) => (
            <tr
              key={i}
              className="bg-white border-b border-gray-300 text-[14px]"
            >
              <td className="py-3 px-4">{row.sl}</td>
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">{row.email}</td>

              {/* Student icon */}
              <td className="py-3 px-4">
                <CircleCheck
                  size={18}
                  className={row.student ? "text-black" : "opacity-40"}
                />
              </td>

              {/* Teacher icon */}
              <td className="py-3 px-4">
                <CircleCheck
                  size={18}
                  className={row.teacher ? "text-black" : "opacity-40"}
                />
              </td>

              <td className="py-3 px-4">
                <button className="bg-red-600 text-white text-[13px] px-4 py-1.5 rounded">
                  Remove
                </button>
              </td>
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
