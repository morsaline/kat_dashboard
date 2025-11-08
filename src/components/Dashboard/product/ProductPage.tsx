"use client";

import Pagination from "@/lib/Pagination";
import { Ellipsis, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect, useMemo } from "react";

const ProductPage = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Example Data ---
  // --- Example Data ---
  // Use useMemo to make products stable across renders
  const products = useMemo(
    () => [
      {
        id: "The Burger Store",
        picture: "/dyson.png",
        name: "Dyson Air",
        price: 2000,
      },
      {
        id: "The Burger Fairy",
        picture: "/panda.png",
        name: "Panda Burger",
        price: 3330,
      },
      {
        id: "Burger Hub",
        picture: "/beats.png",
        name: "Beats Burger",
        price: 6000,
      },
      {
        id: "The Burger Palace",
        picture: "/panda.png",
        name: "Palace Burger",
        price: 2700,
      },
      {
        id: "Burger King",
        picture: "/dyson.png",
        name: "Royal Burger",
        price: 3500,
      },
      {
        id: "Burger Bros",
        picture: "/beats.png",
        name: "Bro Burger",
        price: 1800,
      },
      {
        id: "The Burger Queen",
        picture: "/dyson.png",
        name: "Queen Burger",
        price: 4500,
      },
      {
        id: "Burger Zone",
        picture: "/panda.png",
        name: "Zone Special",
        price: 3900,
      },
    ],
    [] // 👈 no dependencies — only created once
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.price.toString().includes(q)
    );
  }, [products, searchQuery]);

  // --- Pagination Setup ---
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Dropdown Handlers ---
  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleDelete = (productId: string) => {
    alert(`Delete product ${productId}`);
    setOpenDropdownIndex(null);
  };

  // --- Close dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(event.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

  return (
    <div className="w-full border border-gray-300 p-4 rounded-md bg-gray-50 mt-5">
      <h1 className="text-xl font-bold mb-3">Products</h1>

      {/* Total Products Summary */}
      <div>
        <div className="border border-gray-200 rounded-md px-6 py-3 w-full text-center bg-[#b2f7f5] max-w-lg my-3">
          <p className="text-gray-700 text-sm font-bold">Total Products</p>
          <p className="text-gray-900 font-semibold text-lg mt-1">
            {products.length}
          </p>
        </div>
      </div>

      {/* Search and Add Button Row */}
      <div className="flex justify-between items-center my-5 flex-wrap gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or price..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2f7f5]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page when searching
            }}
          />
        </div>

        {/* Add Product Button */}
        <Link href={"/dashboard/add-product"}>
          <button className="bg-[#b2f7f5] border px-4 py-2 font-medium hover:bg-[#9decea] transition">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Table */}
      <table className="w-full text-left border border-gray-200 bg-gray-50">
        <thead>
          <tr className="bg-[#b2f7f5] text-gray-700 text-sm">
            <th className="py-2 px-4 font-medium border-b border-gray-200">
              Product Id
            </th>
            <th className="py-2 px-4 font-medium border-b border-gray-200">
              Product Picture
            </th>
            <th className="py-2 px-4 font-medium border-b border-gray-200">
              Product Name
            </th>
            <th className="py-2 px-4 font-medium border-b border-gray-200">
              Price
            </th>
            <th className="py-2 px-4 font-medium border-b border-gray-200">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {currentProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                No products found.
              </td>
            </tr>
          ) : (
            currentProducts.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{item.id}</td>

                <td className="py-2 px-4">
                  <Image
                    src={item.picture}
                    alt="product"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </td>

                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">${item.price}</td>

                <td className="py-2 px-4 relative">
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <Ellipsis />
                  </button>

                  {openDropdownIndex === index && (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[index] = el;
                      }}
                      className="absolute left-0 top-full mt-1 w-28 bg-white border border-gray-200 rounded shadow-md z-10"
                    >
                      <Link href={"/dashboard/edit-product"}>
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductPage;
