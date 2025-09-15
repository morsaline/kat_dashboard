"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Upload, Plus, X, ArrowLeft } from "lucide-react";
import {
  MenuItem,
  Restaurant,
} from "@/app/(DashboardLayout)/dashboard/restaurants/page";
import Image from "next/image";

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSubmit: (restaurant: Restaurant | Omit<Restaurant, "id">) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function RestaurantForm({
  restaurant,
  onSubmit,
  onCancel,
  isEditing = false,
}: RestaurantFormProps) {
  const [formData, setFormData] = useState({
    name: restaurant?.name || "",
    address: restaurant?.address || "",
    whatsapp: restaurant?.whatsapp || "",
    instagram: restaurant?.instagram || "",
    description: restaurant?.description || "",
    productImage: restaurant?.productImage || null, // use null for no image
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    restaurant?.menuItems || [
      {
        id: "1",
        name: "",
        itemG1: "",
        itemG2: "",
        itemG3: "",
        price: "",
        picture: "", // null for no image
      },
    ]
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMenuItemChange = (
    index: number,
    field: string,
    value: string | null
  ) => {
    setMenuItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addMenuItem = () => {
    setMenuItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        itemG1: "",
        itemG2: "",
        itemG3: "",
        price: "",
        picture: "",
      },
    ]);
  };

  const removeMenuItem = (index: number) => {
    if (menuItems.length > 1) {
      setMenuItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
      e.target.value = "";
    }
  };

  const handleMenuItemFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMenuItems((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, picture: imageUrl } : item
        )
      );
      e.target.value = "";
    }
  };

  const handleRemoveProductImage = () => {
    setFormData((prev) => ({ ...prev, productImage: null }));
  };
  const handleRemoveMenuItemImage = (index: number) => {
    setMenuItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, picture: "" } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const restaurantData = {
      ...formData,
      productImage: formData.productImage || null, // ensure null if removed
      menuItems: menuItems.map((item) => ({
        ...item,
        picture: item.picture || null, // ensure null if removed
      })),
      ...(isEditing && restaurant ? { id: restaurant.id } : {}),
    };

    onSubmit(restaurantData as Restaurant);
  };

  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onCancel}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Restaurants List
          </h1>
          {!isEditing && (
            <h2 className="text-lg font-semibold text-primary mb-4">
              Add Restaurants
            </h2>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Restaurant Name*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address*</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp*</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    handleInputChange("whatsapp", e.target.value)
                  }
                  placeholder="Enter WhatsApp number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram*</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  placeholder="Enter Instagram account"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Add description"
                rows={4}
                required
              />
            </div>

            {/* Product Image Upload */}
            <div className="space-y-2">
              <Label>Product Image*</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center relative">
                {formData.productImage ? (
                  <div className="relative">
                    <Image
                      src={formData.productImage}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="mx-auto h-32 w-auto mb-4 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={handleRemoveProductImage}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  key={formData.productImage || "productImage"}
                  onChange={(e) => handleFileUpload(e, "productImage")}
                  className="hidden"
                  id="productImageUpload"
                />
                <Label htmlFor="productImageUpload" className="cursor-pointer">
                  <div className="bg-primary text-white px-4 py-2 rounded">
                    Browse Files
                  </div>
                </Label>
              </div>
            </div>

            {/* Menu Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Add Menu</h3>
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg mb-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Menu Item {index + 1}</h4>
                    {menuItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenuItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Food name*"
                      value={item.name}
                      onChange={(e) =>
                        handleMenuItemChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <Input
                      placeholder="Item 01*"
                      value={item.itemG1}
                      onChange={(e) =>
                        handleMenuItemChange(index, "itemG1", e.target.value)
                      }
                      required
                    />
                    <Input
                      placeholder="Item 02"
                      value={item.itemG2}
                      onChange={(e) =>
                        handleMenuItemChange(index, "itemG2", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Item 03"
                      value={item.itemG3}
                      onChange={(e) =>
                        handleMenuItemChange(index, "itemG3", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Price*"
                      value={item.price}
                      onChange={(e) =>
                        handleMenuItemChange(index, "price", e.target.value)
                      }
                      required
                    />
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center relative">
                      {item.picture ? (
                        <div className="relative">
                          <Image
                            src={item.picture}
                            width={128}
                            height={128}
                            alt="Menu Preview"
                            className="mx-auto h-24 w-auto mb-2 rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            onClick={() => handleRemoveMenuItemImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        key={item.picture || item.id}
                        onChange={(e) => handleMenuItemFileUpload(e, index)}
                        className="hidden"
                        id={`menuImage-${item.id}`}
                      />
                      <Label htmlFor={`menuImage-${item.id}`}>
                        <Button
                          type="button"
                          variant="default"
                          className="text-white"
                        >
                          Browse Files
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="ghost" onClick={addMenuItem}>
                <Plus className="h-4 w-4" /> Add More
              </Button>
            </div>

            {/* Submit & Cancel */}
            <div className="flex gap-4 pt-6 justify-end">
              {isEditing && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  className="px-6"
                >
                  Cancel
                </Button>
              )}
              <Button variant="default" type="submit">
                {isEditing ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
