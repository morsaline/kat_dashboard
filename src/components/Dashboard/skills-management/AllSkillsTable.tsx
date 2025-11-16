"use client";
import Pagination from "@/lib/Pagination";
import { useState } from "react";

export default function AllSkillsTable() {
  const rows = [
    { skillName: "Watercolor Painting", users: 32 },
    { skillName: "Graphite Sketching", users: 18 },
    { skillName: "Clay Modeling", users: 12 },
    { skillName: "Origami", users: 20 },
    { skillName: "Wood Carving", users: 25 },
    { skillName: "Oil Painting", users: 30 },
    { skillName: "Craft Decorations", users: 15 },
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
      {/* Title */}
      <h3 className="text-[16px] text-gray-700 mb-3 font-medium">All Skills</h3>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white text-[14px]">
            <th className="py-3 px-4 text-left rounded-tl-md">Skill Name</th>
            <th className="py-3 px-4 text-left">Users</th>
            <th className="py-3 px-4 text-left rounded-tr-md">Action</th>
          </tr>
        </thead>

        <tbody>
          {displayedRows.map((row, i) => (
            <tr
              key={i}
              className="bg-white border-b border-gray-300 text-[14px]"
            >
              <td className="py-3 px-4">{row.skillName}</td>
              <td className="py-3 px-4">{row.users}</td>

              <td className="py-3 px-4">
                <button className="bg-red-600 text-white text-[13px] px-4 py-1.5 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination aligned left */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
