// File: components/UserTable.tsx
"use client";

import Pagination from "@/lib/Pagination";
import { Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
// import your reusable Pagination component

type User = {
  id: string;
  name: string;
  email: string;
  address: string;
};

const MOCK_USERS: User[] = [
  {
    id: "740",
    name: "Annette Black",
    email: "tim.jennings@example.com",
    address: "London",
  },
  {
    id: "177",
    name: "Kristin Watson",
    email: "georgia.young@example.com",
    address: "Birmingham",
  },
  {
    id: "556",
    name: "Marvin McKinney",
    email: "felicia.reid@example.com",
    address: "Manchester",
  },
  {
    id: "883",
    name: "Cameron Williamson",
    email: "kenzi.lawson@example.com",
    address: "Leeds",
  },
  {
    id: "185",
    name: "Albert Flores",
    email: "willie.jennings@example.com",
    address: "Liverpool",
  },
  {
    id: "991",
    name: "Rita Smith",
    email: "rita.smith@example.com",
    address: "Sheffield",
  },
  {
    id: "992",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "Nottingham",
  },
  {
    id: "993",
    name: "Mary Jane",
    email: "mary.jane@example.com",
    address: "Bristol",
  },
  {
    id: "994",
    name: "Peter Pan",
    email: "peter.pan@example.com",
    address: "Oxford",
  },
  {
    id: "995",
    name: "Lucy Liu",
    email: "lucy.liu@example.com",
    address: "Cambridge",
  },
  {
    id: "996",
    name: "Oscar Wilde",
    email: "oscar.w@example.com",
    address: "Brighton",
  },
];

export default function UserTable({ users = MOCK_USERS }: { users?: User[] }) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.id.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.address.toLowerCase().includes(q)
    );
  }, [query, users]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // Clamp current page if totalPages change
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const onDelete = (id: string) => {
    alert(`Delete user id: ${id}`);
  };

  return (
    <div className=" bg-white rounded-xl shadow-sm border  p-5 mt-5">
      <h1 className="text-3xl font-bold">Users</h1>
      <div>
        <div className="border border-gray-200 rounded-md px-6 py-3 w-full text-center bg-[#b2f7f5] max-w-lg my-3">
          <p className="text-gray-700 text-sm font-bold">Total Users</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">124</p>
        </div>
      </div>
      <div>
        {" "}
        {/* Search input */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex-1 flex ">
            <input
              aria-label="Search users"
              placeholder="Search by id, name, email or address"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border max-w-4xl border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b2f7f5]"
            />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-[#dffafb] text-gray-700 text-sm">
                <th className="py-3 px-4 font-semibold text-xs border-b border-gray-100">
                  User Id
                </th>
                <th className="py-3 px-4 font-semibold text-xs border-b border-gray-100">
                  User Name
                </th>
                <th className="py-3 px-4 font-semibold text-xs border-b border-gray-100">
                  User Email
                </th>
                <th className="py-3 px-4 font-semibold text-xs border-b border-gray-100">
                  Address
                </th>
                <th className="py-3 px-4 font-semibold text-xs border-b border-gray-100">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {pageItems.length ? (
                pageItems.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{u.id}</td>
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">{u.address}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onDelete(u.id)}
                        className="inline-flex items-center justify-center rounded-md p-1.5 border border-sky-100 hover:bg-sky-50"
                        title="Delete"
                        aria-label={`Delete ${u.name}`}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-6 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
