"use client";
import Pagination from "@/lib/Pagination";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

export default function ActiveUsersTableWithPagination() {
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
    <div className="w-full max-w-6xl mx-auto mt-8 bg-green-200 p-5">
      <h3 className="text-[16px] text-gray-800 mb-3">Active users</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-black">
            <th className="py-3 px-4 text-left rounded-tl-lg">Sl. No.</th>
            <th className="py-3 px-4 text-left">User Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Student</th>
            <th className="py-3 px-4 text-left rounded-tr-lg">Teacher</th>
          </tr>
        </thead>

        <tbody>
          {displayedRows.map((row, i) => (
            <tr key={i} className="bg-green-200 border-b border-black">
              <td className="py-3 px-4">{row.sl}</td>
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">{row.email}</td>
              <td className="py-3 px-4">
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
