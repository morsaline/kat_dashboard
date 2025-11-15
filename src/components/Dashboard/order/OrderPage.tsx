/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import Pagination from "@/lib/Pagination";
import StaticOrdersStats from "./StaticOrderStats";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";

const OrderPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 7;
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetOrdersQuery({
    page: currentPage,
    limit,
    status: statusFilter,
  });

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return orders;

    return orders.filter((order: any) => {
      const orderTitles =
        order.orderItems
          ?.map((t: any) => t.product?.title.toLowerCase())
          .join(", ") || "";
      return (
        order.id.toLowerCase().includes(q) ||
        orderTitles.includes(q) ||
        order.user.shopName.toLowerCase().includes(q)
      );
    });
  }, [search, orders]);

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-4">
      <StaticOrdersStats />

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, store or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 w-full md:max-w-md text-base rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2f7f5]"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 text-base rounded-lg px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">All Orders</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#b2f7f5] text-gray-700 text-sm sm:text-base">
              <th className="py-3 px-3 sm:px-5">Order ID</th>
              <th className="py-3 px-3 sm:px-5">Item Name</th>
              <th className="py-3 px-3 sm:px-5">Store Name</th>
              <th className="py-3 px-3 sm:px-5">Date</th>
              <th className="py-3 px-3 sm:px-5">Qty</th>
              <th className="py-3 px-3 sm:px-5">Price</th>
              <th className="py-3 px-3 sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order: any, idx: number) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-3 sm:px-5">{idx + 1}</td>
                  <td className="py-2 px-3 sm:px-5">
                    {order.orderItems
                      ?.map((t: any) => t.product?.title)
                      .join(", ")}
                  </td>
                  <td className="py-2 px-3 sm:px-5">{order?.user?.shopName}</td>
                  <td className="py-2 px-3 sm:px-5">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-3 sm:px-5">{order.totalQuantity}</td>
                  <td className="py-2 px-3 sm:px-5">{order.totalPrice}</td>
                  <td
                    className={`py-2 px-3 sm:px-5 font-semibold ${
                      order.status === "COMPLETED"
                        ? "text-green-600"
                        : order.status === "CANCELED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default OrderPage;
