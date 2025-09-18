/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useGetServiceCategoriesQuery,
  useAddServiceMutation,
  useEditServiceMutation,
  Service,
} from "@/redux/features/serrviceList/ServiceListApi";
import { toast } from "sonner";
import { fetchLatLng } from "../Restaurant/AddRestaurants";

interface ServiceFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  service?: Service;
  isEdit?: boolean;
}

export function ServiceForm({
  onSubmit: onSuccess,
  onCancel,
  service,
  isEdit = false,
}: ServiceFormProps) {
  const { data: categories, isLoading: loadingCategories } =
    useGetServiceCategoriesQuery();

  const [addService] = useAddServiceMutation();
  const [editService] = useEditServiceMutation();

  const facilityRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Form state - initialize from `service` if editing
  const [formData, setFormData] = useState({
    serviceName: service?.serviceName || "",
    category: service?.category || "",
    address: service?.address || "",
    phone: service?.phone || "",
  });

  const [facilityInputs, setFacilityInputs] = useState<string[]>(
    service?.facilities && service.facilities.length > 0
      ? [...service.facilities]
      : [""]
  );

  // Update form when `service` changes (e.g., switching between edits)
  useEffect(() => {
    if (isEdit && service) {
      setFormData({
        serviceName: service.serviceName || "",
        category: service.category || "",
        address: service.address || "",
        phone: service.phone || "",
      });
      setFacilityInputs([...service.facilities]);
    }
  }, [service, isEdit]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addFacility = () => {
    setFacilityInputs((prev) => [...prev, ""]);
  };

  const removeFacility = (index: number) => {
    if (facilityInputs.length > 1) {
      setFacilityInputs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleFacilityChange = (index: number, value: string) => {
    const newFacilities = [...facilityInputs];
    newFacilities[index] = value;
    setFacilityInputs(newFacilities);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { serviceName, category, address, phone } = formData;

    // Validate required fields
    if (!serviceName || !category || !address || !phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Geocode address to get lat/lng
    let latStr = "0",
      lngStr = "0";
    try {
      const { lat, lng } = await fetchLatLng(address);
      latStr = String(lat);
      lngStr = String(lng);
    } catch (err) {
      toast.error("Could not determine location. Please check the address.");
      return;
    }

    // Filter and validate facilities
    const filteredFacilities = facilityInputs
      .map((f) => f.trim())
      .filter(Boolean);

    if (filteredFacilities.length === 0) {
      toast.error("At least one facility is required.");
      return;
    }

    // Build service data object
    const serviceData = {
      serviceName,
      category,
      address,
      lat: latStr,
      lng: lngStr,
      phone,
      facilities: filteredFacilities,
    };

    // Create FormData payload
    const payload = new FormData();
    payload.append("data", JSON.stringify(serviceData));

    // Append images
    const imageFiles = imageInputRef.current?.files;
    if (imageFiles) {
      Array.from(imageFiles).forEach((file) => {
        if (file.type.startsWith("image/")) {
          payload.append("images", file);
        }
      });
    }

    // Append video
    // const videoFile = videoInputRef.current?.files?.[0];
    // if (videoFile && videoFile.type.startsWith("video/")) {
    //   payload.append("video", videoFile);
    // }

    try {
      if (isEdit && service?.id) {
        // ✅ Update existing service
        const result = await editService({
          id: service.id,
          formData: payload,
        }).unwrap();
        if (result?.success) {
          toast.success(result?.message || "Service updated successfully!");
          onSuccess(); // Close modal + refetch list
        } else {
          toast.error(result?.message || "Failed to update service.");
        }
      } else {
        // ✅ Create new service
        const result = await addService(payload).unwrap();
        if (result?.success) {
          toast.success(result?.message || "Service added successfully!");
          onSuccess(); // Close modal + refetch list
        } else {
          toast.error(result?.message || "Failed to add service.");
        }
      }
    } catch (error: any) {
      console.error("Error saving service:", error);
      toast.error(error.data?.message || "Failed to save service.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-1">
            {isEdit ? "Edit Service" : "Add New Service"}
          </p>
          <h1 className="text-xl font-semibold text-orange-500">
            {isEdit ? "Edit Service" : "Add Service"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name<span className="text-red-500">*</span>
              </label>
              <Input
                name="serviceName"
                placeholder="Enter service name"
                value={formData.serviceName}
                onChange={(e) =>
                  handleInputChange("serviceName", e.target.value)
                }
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category<span className="text-red-500">*</span>
              </label>
              {loadingCategories ? (
                <p>Loading categories...</p>
              ) : (
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  required
                >
                  <SelectTrigger
                    className="w-full"
                    disabled={!categories?.data?.length}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.data.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Address and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address<span className="text-red-500">*</span>
              </label>
              <Input
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone<span className="text-red-500">*</span>
              </label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facilities
            </label>
            <div ref={facilityRef} className="space-y-3">
              {facilityInputs.map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Add facility"
                    value={value}
                    onChange={(e) =>
                      handleFacilityChange(index, e.target.value)
                    }
                    className="flex-1"
                  />
                  {facilityInputs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFacility(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addFacility}
              className="mt-2 text-orange-500 border-orange-500 hover:bg-orange-50 flex items-center gap-2 bg-transparent"
            >
              <Plus className="h-4 w-4" /> Add Facility
            </Button>
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={imageInputRef}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                className="bg-orange-50"
              >
                <Upload className="h-4 w-4 mr-2" /> Choose Images
              </Button>
              {imageInputRef.current?.files?.length ? (
                <p className="mt-2 text-sm text-gray-600">
                  {imageInputRef.current.files.length} image(s) selected
                </p>
              ) : null}
            </div>
          </div>

          {/* Video Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Video (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={videoInputRef}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => videoInputRef.current?.click()}
                className="text-orange-500 border-orange-500 hover:bg-orange-50"
              >
                <Upload className="h-4 w-4 mr-2" /> Choose Video
              </Button>
              {videoInputRef.current?.files?.[0] && (
                <p className="mt-2 text-sm text-green-600">
                  {videoInputRef.current.files[0].name}
                </p>
              )}
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-8"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              {isEdit ? "Update Service" : "Create Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
