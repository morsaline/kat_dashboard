import EditProduct from "@/components/Dashboard/product/EditProduct";
import React from "react";

function page() {
  const value = { name: "morsaline", price: "222", image: "" };
  return (
    <div>
      <EditProduct defaultValues={value} />
    </div>
  );
}

export default page;
