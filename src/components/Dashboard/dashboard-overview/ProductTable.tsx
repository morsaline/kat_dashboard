"use client";

import Image from "next/image";
import React from "react";

const ProductTable = () => {
  // Example data (you can replace with API data)
  const products = [
    {
      id: "The Burger Store",
      picture: "/dyson.png",
      name: 1100,
      price: 2000,
    },
    {
      id: "The Burger Fairy",
      picture: "/panda.png",
      name: 1200,
      price: 3330,
    },
    {
      id: "The Burger Fairy",
      picture: "/beats.png",
      name: 300,
      price: 6000,
    },
  ];

  return (
    <div className="w-full border border-gray-300 p-4 rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Product List</h2>

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
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {products.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">{item.id}</td>

              <td className="py-2 px-4">
                <Image
                  src={item.picture}
                  alt="product"
                  width={32} // equivalent to w-8
                  height={32} // equivalent to h-8
                  className="object-contain"
                />
              </td>

              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
