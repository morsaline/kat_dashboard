"use client";
import Pagination from "@/lib/Pagination";
import { useState } from "react";

export default function AllSubCategoriesTable() {
  const rows = [
    { subCategory: "Watercolor Painting", skills: 20, users: 32 },
    { subCategory: "Graphite Sketching", skills: 14, users: 18 },
    { subCategory: "Clay Modeling", skills: 10, users: 12 },
    { subCategory: "Origami", skills: 8, users: 20 },
    { subCategory: "Wood Carving", skills: 16, users: 25 },
    { subCategory: "Oil Painting", skills: 22, users: 30 },
    { subCategory: "Craft Decorations", skills: 12, users: 15 },
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
      <h3 className="text-[16px] text-gray-700 mb-3 font-medium">
        All Sub-categories
      </h3>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white text-[14px]">
            <th className="py-3 px-4 text-left rounded-tl-md">
              Sub-category Name
            </th>
            <th className="py-3 px-4 text-left">Skills</th>
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
              <td className="py-3 px-4">{row.subCategory}</td>
              <td className="py-3 px-4">{row.skills}</td>
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

      {/* Pagination aligned left exactly like screenshot */}
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
