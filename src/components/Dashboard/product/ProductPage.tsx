/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Pagination from "@/lib/Pagination";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/product/productApi";
import { Ellipsis, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null); // Modal delete ID
  const limit = 10;

  // ✅ Fetch products
  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    page: 1,
    limit: 1000, // fetch all for client-side filtering
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = data?.data?.data ?? [];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter((product: any) => {
      return (
        product.title?.toLowerCase().includes(query) ||
        product.serialNumber?.toLowerCase().includes(query) ||
        String(product.price)?.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filteredProducts.slice(start, start + limit);
  }, [filteredProducts, currentPage, limit]);

  // ✅ Dropdown toggle
  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // ✅ Close dropdown on outside click
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

  // ✅ Loading & Error states
  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-500">Loading products...</p>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load products. Please try again later.
      </p>
    );

  return (
    <div className="w-full border border-gray-300 p-4 rounded-md bg-gray-50 mt-5">
      <h1 className="text-xl font-bold mb-3">Products</h1>

      {/* Total Products Summary */}
      <div className="border border-gray-200 rounded-md px-6 py-3 w-full text-center bg-[#b2f7f5] max-w-lg my-3">
        <p className="text-gray-700 text-sm font-bold">Total Products</p>
        <p className="text-gray-900 font-semibold text-lg mt-1">
          {filteredProducts.length || 0}
        </p>
      </div>

      {/* Search + Add Button */}
      <div className="flex justify-between items-center my-5 flex-wrap gap-3">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, serial or price..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2f7f5]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <Link href="/dashboard/add-product">
          <button className="bg-[#b2f7f5] border px-4 py-2 font-medium hover:bg-[#9decea] transition">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Products Table */}
      <table className="w-full text-left border border-gray-200 bg-gray-50">
        <thead>
          <tr className="bg-[#b2f7f5] text-gray-700 text-sm">
            <th className="py-2 px-4 font-medium border-b">Image</th>
            <th className="py-2 px-4 font-medium border-b">Title</th>
            <th className="py-2 px-4 font-medium border-b">Serial</th>
            <th className="py-2 px-4 font-medium border-b">Price</th>
            <th className="py-2 px-4 font-medium border-b">Quantity</th>
            <th className="py-2 px-4 font-medium border-b">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {paginatedProducts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                No products found.
              </td>
            </tr>
          ) : (
            paginatedProducts.map((item: any, index: number) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-contain rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  )}
                </td>
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4">{item.serialNumber}</td>
                <td className="py-2 px-4">${item.price}</td>
                <td className="py-2 px-4">{item.quantity}</td>

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
                      <Link href={`/dashboard/products/single/${item.id}`}>
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => setDeleteId(item.id)}
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={async () => {
                  if (!deleteId) return;
                  try {
                    await deleteProduct(deleteId).unwrap();
                    toast.success("Product deleted successfully");
                    refetch();
                  } catch (error: any) {
                    toast.error(
                      error?.data?.message || "Failed to delete product"
                    );
                  } finally {
                    setDeleteId(null);
                  }
                }}
              >
                {isDeleting? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
