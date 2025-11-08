/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, price, image };

    alert("Product added!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Add Product</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        {/* Product Name */}
        <label className="block font-semibold mb-1">Enter Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 focus:outline-none text-sm"
        />

        {/* Price */}
        <label className="block font-semibold mb-1">Enter Product Price</label>
        <input
          type="number"
          placeholder="$ Enter product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 focus:outline-none text-sm"
        />

        {/* Image Upload */}
        <label className="block font-semibold mb-1">Product Image</label>
        <label className="border border-gray-300 rounded-lg w-full h-32 flex flex-col justify-center items-center cursor-pointer text-gray-400 text-sm">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />

          {image ? image.name : "Upload Product picture"}
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#b2f7f5]  text-black font-semibold py-2 rounded-md mt-6 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
