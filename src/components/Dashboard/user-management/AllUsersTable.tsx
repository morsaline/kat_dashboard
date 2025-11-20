"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Pagination from "@/lib/Pagination";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/users/usersApi";
import Loading from "@/app/loading";

export default function AllUsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const { data, isLoading, error } = useGetUsersQuery({
    page: currentPage,
    limit: rowsPerPage,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [userToDelete, setUserToDelete] = useState<any>(null); // State for user to be deleted

  useEffect(() => {
    if (data) {
      setCurrentPage(data?.data?.meta?.page || 1);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading users.</div>;

  const totalPages = data?.data?.meta?.totalPages || 1;
  const displayedRows = data?.data?.data || [];

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user); // Store the user to be deleted
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      await deleteUser({ id: userToDelete.id });
      setIsModalOpen(false); // Close modal after deletion
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false); // Close modal without deleting
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <h3 className="text-[16px] text-gray-700 mb-3 font-medium">All Users</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white text-[14px]">
            <th className="py-3 px-4 text-left rounded-tl-md">Sl. No.</th>
            <th className="py-3 px-4 text-left">User Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left rounded-tr-md">Action</th>
          </tr>
        </thead>

        <tbody>
          {displayedRows?.map((user: any) => (
            <tr
              key={user.id}
              className="bg-white border-b border-gray-300 text-[14px]"
            >
              <td className="py-3 px-4">{user.serial}</td>
              <td className="py-3 px-4">{user.fullName}</td>
              <td className="py-3 px-4">{user.email}</td>

              <td className="py-3 px-4">
                <button
                  className="bg-red-600 text-white text-[13px] px-4 py-1.5 rounded"
                  onClick={() => handleDeleteClick(user)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h4 className="text-xl mb-4">
              Are you sure you want to delete this user?
            </h4>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleDeleteCancel}
              >
                No
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
