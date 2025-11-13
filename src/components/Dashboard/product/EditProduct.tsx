"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { toast } from "sonner";

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ dynamic param from [id] folder
  console.log("Editing product ID:", id);

  // Fetch product data
  const { data, isLoading, isError } = useGetProductByIdQuery(id as string, {
    skip: !id, // don't fetch if id is undefined
  });
  const product = data?.data;

  // Update mutation
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Populate form when product data loads
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price.toString());
      setPreview(product.image); // URL of existing image
    }
  }, [product]);

  // Handle image upload preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      await updateProduct({ id, formData }).unwrap(); // ✅ pass FormData directly
      toast.success("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Failed to load product data.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <label className="block font-semibold mb-1">Product Title</label>
        <input
          type="text"
          placeholder="Enter Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 focus:outline-none text-sm"
        />

        <label className="block font-semibold mb-1">Product Price</label>
        <input
          type="number"
          placeholder="$ Enter product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 focus:outline-none text-sm"
        />

        <label className="block font-semibold mb-1">Product Image</label>
        <label className="border border-gray-300 rounded-lg w-full h-32 flex flex-col justify-center items-center cursor-pointer text-gray-400 text-sm overflow-hidden">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          {preview ? (
            <Image
              src={preview}
              alt="Product Preview"
              width={400}
              height={128}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            "Upload Product Image"
          )}
        </label>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-[#b2f7f5] text-black font-semibold py-2 rounded-md mt-6 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
