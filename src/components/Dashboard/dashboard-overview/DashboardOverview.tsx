"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import RevenueChart from "./RevenueChart";
import ProductTable from "./ProductTable";

function DashboardOverview() {
  const [selected, setSelected] = useState("Weekly");
  const [open, setOpen] = useState(false);

  const users = [
    { name: "The Burger Store", email: "TheB@gmail.com", location: "Dhaka" },
    {
      name: "The Burger Fairy",
      email: "willie.jennings@example.com",
      location: "London",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "jackson.graham@example.com",
      location: "Manchester",
    },
    {
      name: "The Burger Fairy",
      email: "michael.mitc@example.com",
      location: "Newcastle",
    },
    {
      name: "The Burger Fairy",
      email: "georgia.young@example.com",
      location: "Newcastle",
    },
  ];

  const options = ["Daily", "Weekly", "Monthly"];
  return (
    <div>
      <div className="flex items-start justify-between w-full px-6 py-4 bg-white rounded-2xl shadow-sm gap-20">
        {/* --- Stats Cards --- */}
        <div className="flex gap-4 w-full ">
          {/* Total Revenue */}
          <div className="border rounded-md px-6 py-6 w-full flex justify-center items-center ">
            <div className="text-center">
              {" "}
              <p className="text-xl text-gray-500 font-bold">Total Revenue</p>
              <p className="text-lg font-semibold text-green-500">$15000</p>
            </div>
          </div>

          {/* Total Users */}
          <div className="border rounded-md px-6 py-6 w-full flex justify-center items-center">
            <div className="text-center">
              <p className="text-xl text-gray-500 font-bold">Total Users</p>
              <p className="text-lg font-semibold text-gray-800">1200</p>
            </div>
          </div>

          {/* Total Products */}
          <div className="border rounded-md px-6 py-6 w-full flex justify-center items-center ">
            <div className="text-center">
              {" "}
              <p className="text-xl text-gray-500 font-bold ">Total Products</p>
              <p className="text-lg font-semibold text-gray-800 ">36</p>
            </div>
          </div>
        </div>

        {/* --- Dropdown --- */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="border rounded-md px-4 py-2 text-sm flex items-center justify-between w-[120px] bg-white"
          >
            {selected}
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-1 w-[120px] bg-white border rounded-md shadow-lg">
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-teal-100 ${
                    selected === opt ? "bg-teal-100" : ""
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 my-4">
        <div className="w-full">
          <RevenueChart />
        </div>
        <div className="w-full max-h-[330px]! overflow-auto">
          {" "}
          {/* Table */}
          <table className="w-full text-left border border-gray-200 ">
            <thead>
              <tr className="bg-[#b2f7f5] text-gray-700 text-sm">
                <th className="py-2 px-4 font-medium">Users Name</th>
                <th className="py-2 px-4 font-medium">User Email</th>
                <th className="py-2 px-4 font-medium">Location</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {users.map((user, i) => (
                <tr key={i} className="border-t border-gray-200 p-5">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductTable />
    </div>
  );
}

export default DashboardOverview;
