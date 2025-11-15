/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Pagination from "@/lib/Pagination";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/user/userApi";
import { Trash } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function UserTable() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useGetUsersQuery({ page: currentPage, limit });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  const formattedUsers = users.map((u: any) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    address: u.location || "N/A",
  }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return formattedUsers;

    return formattedUsers.filter(
      (u: any) =>
        u.id.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.address.toLowerCase().includes(q)
    );
  }, [query, formattedUsers]);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteUser(deleteId).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-700 text-lg">
        Loading users...
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-5 mt-5">
      <h1 className="text-2xl md:text-3xl font-bold mb-3">Users</h1>

      {/* Total Users */}
      <div className="flex justify-center mb-4">
        <div className="border border-gray-200 rounded-md px-4 py-2 md:px-6 md:py-3 w-full max-w-md text-center bg-[#b2f7f5]">
          <p className="text-gray-700 text-sm font-bold">Total Users</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">
            {data?.meta?.totalUsers || 0}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-center mb-4">
        <input
          aria-label="Search users"
          placeholder="Search by id, name, email or address"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-full md:max-w-4xl border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b2f7f5]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-[#dffafb] text-gray-700 text-sm">
              <th className="py-2 px-3 md:py-3 md:px-4">User Id</th>
              <th className="py-2 px-3 md:py-3 md:px-4">User Name</th>
              <th className="py-2 px-3 md:py-3 md:px-4">User Email</th>
              <th className="py-2 px-3 md:py-3 md:px-4">Address</th>
              <th className="py-2 px-3 md:py-3 md:px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filtered.length ? (
              filtered.map((u: any) => (
                <tr
                  key={u.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-3 md:py-3 md:px-4">{u.id}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4">{u.name}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4">{u.email}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4">{u.address}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4 flex justify-center">
                    <button
                      onClick={() => setDeleteId(u.id)}
                      className="inline-flex items-center justify-center rounded-md p-1.5 border border-red-200 hover:bg-red-50 text-red-600"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 md:py-8 text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 md:mt-6 flex justify-center md:justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 px-4">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this user?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
