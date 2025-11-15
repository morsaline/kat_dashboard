/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDashboardQuery } from "@/redux/features/user/userApi";
import Image from "next/image";
import React from "react";

const ProductTable = () => {
  const { data, isLoading, isError } = useGetDashboardQuery({});

  const products = data?.data?.productList || [];

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="w-full border border-gray-300 p-4 rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Product List</h2>

      <div className="max-h-56 overflow-auto">
        <table className="w-full text-left border border-gray-200 bg-gray-50 ">
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
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {products.map((item: any, index: number) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-2 px-4">{item.productId}</td>

                <td className="py-2 px-4">
                  {item.productPicture ? (
                    <Image
                      src={item.productPicture}
                      alt={item.productName}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>

                <td className="py-2 px-4">{item.productName}</td>
                <td className="py-2 px-4">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
