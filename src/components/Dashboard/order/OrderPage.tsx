"use client";

import React, { useState, useMemo } from "react";
import Pagination from "@/lib/Pagination";
import StaticOrdersStats from "./StaticOrderStats";

const OrderPage = () => {
  const allOrders = [
    {
      id: "123456",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Brooklyn Simmons",
      date: "3/4/16",
      quantity: "05",
      price: "£240",
      status: "Complete",
    },
    {
      id: "123457",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Brooklyn Simmons",
      date: "7/18/17",
      quantity: "05",
      price: "£240",
      status: "Cancelled",
    },
    {
      id: "123458",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Brooklyn Simmons",
      date: "12/4/17",
      quantity: "05",
      price: "£240",
      status: "Complete",
    },
    {
      id: "123459",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Brooklyn Simmons",
      date: "8/30/14",
      quantity: "05",
      price: "£240",
      status: "Cancelled",
    },
    {
      id: "123460",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Jane Cooper",
      date: "10/11/20",
      quantity: "10",
      price: "£480",
      status: "Complete",
    },
    {
      id: "123460",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Jane Cooper",
      date: "10/11/20",
      quantity: "10",
      price: "£480",
      status: "Complete",
    },
    {
      id: "123460",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Jane Cooper",
      date: "10/11/20",
      quantity: "10",
      price: "£480",
      status: "Complete",
    },
    {
      id: "123460",
      itemName: "Secret Algerienne sauce 12 x 1 liters",
      storeName: "Jane Cooper",
      date: "10/11/20",
      quantity: "10",
      price: "£480",
      status: "Complete",
    },
    {
      id: "123461",
      itemName: "Ketchup Pack 5 x 2 liters",
      storeName: "Guy Hawkins",
      date: "11/5/21",
      quantity: "07",
      price: "£300",
      status: "Pending",
    },
  ];

  const [filter, setFilter] = useState("Total orders");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // ✅ Filter by status
  const filteredOrdersByStatus =
    filter === "Total orders"
      ? allOrders
      : filter === "Completed orders"
      ? allOrders.filter((order) => order.status === "Complete")
      : filter === "Cancelled orders"
      ? allOrders.filter((order) => order.status === "Cancelled")
      : filter === "Pending orders"
      ? allOrders.filter((order) => order.status === "Pending")
      : allOrders;

  // ✅ Search filter
  const searchedOrders = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return filteredOrdersByStatus;
    return filteredOrdersByStatus.filter(
      (order) =>
        order.id.toLowerCase().includes(q) ||
        order.itemName.toLowerCase().includes(q) ||
        order.storeName.toLowerCase().includes(q)
    );
  }, [search, filteredOrdersByStatus]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(searchedOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return searchedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [searchedOrders, currentPage]);

  return (
    <div className="w-full border border-gray-200 p-6 bg-white rounded-xl shadow-md">
      <StaticOrdersStats />
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, store or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 min-w-4xl text-base rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2f7f5]"
        />
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 text-base rounded-lg px-4 py-2 focus:outline-none focus:ring-2  focus:ring-teal-400"
        >
          <option>Total orders</option>
          <option>Completed orders</option>
          <option>Pending orders</option>
          <option>Cancelled orders</option>
        </select>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#b2f7f5] text-gray-700 text-lg">
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Order ID
              </th>
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Item Name
              </th>
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Store Name
              </th>
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Date
              </th>
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Quantity
              </th>
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Price
              </th>
              <th className="py-3 px-5 font-semibold border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="text-base text-gray-700">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-5">{order.id}</td>
                  <td className="py-3 px-5">{order.itemName}</td>
                  <td className="py-3 px-5">{order.storeName}</td>
                  <td className="py-3 px-5">{order.date}</td>
                  <td className="py-3 px-5">{order.quantity}</td>
                  <td className="py-3 px-5 font-medium">{order.price}</td>
                  <td
                    className={`py-3 px-5 font-semibold ${
                      order.status === "Complete"
                        ? "text-green-600"
                        : order.status === "Cancelled"
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
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="mt-6 flex justify-end">
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
