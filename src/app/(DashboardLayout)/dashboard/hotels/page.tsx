"use client";

import { HotelForm } from "@/components/Hotel/Hotel-From";
import { HotelList } from "@/components/Hotel/Hotel-List";
import { HotelModal } from "@/components/Hotel/Hotel-modal";
import { useState } from "react";

export interface Hotel {
  id: string;
  hotelId: string;
  name: string;
  address: string;
  whatsapp: string;
  instagram: string;
  phone: string;
  description: string;
  productImage: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  beds: string;
  washroom: string;
  pictures: string[];
  parking: string;
  gym: string;
  swimming: string;
  wifi: string;
  breakfast: string;
  picture: string;
  roomPictures: string[];
}

export default function HotelManagement() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: "H001",
      hotelId: "H001",
      name: "Sunset Paradise Hotel",
      address: "Miami Beach, Florida",
      whatsapp: "0771002345",
      instagram: "@sunsetparadise",
      phone: "0123456789",
      description: "A vibrant hotel with stunning sunsets and beach access.",
      productImage: "/images/hotel/luxury-hotel-exterior.png",
      rooms: [
        {
          id: "1",
          name: "Deluxe Ocean View",
          beds: "2 Queen Beds",
          washroom: "En-suite",
          parking: "Available",
          gym: "24/7 Access",
          swimming: "Pool Access",
          wifi: "Free WiFi",
          breakfast: "Included",
          picture: "/images/hotel/business-hotel-room.png", // Add this line
          pictures: ["/images/hotel/business-hotel-room.png"],
          roomPictures: ["/images/hotel/business-hotel-room.png"],
        },
      ],
    },
    // ... other hotels
  ]);

  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">(
    "list"
  );
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (hotel: Hotel | Omit<Hotel, "id">) => {
    if ("id" in hotel) {
      // Edit
      setHotels(hotels.map((h) => (h.id === hotel.id ? hotel : h)));
      setEditingHotel(null);
    } else {
      console.log(hotel, "add hotels");
      // Add
      const newHotel: Omit<Hotel, "id"> = {
        ...hotel,
        hotelId: `H${String(Date.now()).slice(-3).padStart(3, "0")}`,
      };
      console.log(newHotel, "hotel Data");
      // setHotels([...hotels, newHotel]);
    }
    setCurrentView("list");
  };

  const handleDeleteHotel = (id: string) => {
    setHotels(hotels.filter((h) => h.id !== id));
  };

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleEditClick = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setCurrentView("edit");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full mx-auto">
        {/* Hotel List */}
        {currentView === "list" && (
          <HotelList
            hotels={hotels}
            onAddNew={() => setCurrentView("add")}
            onEdit={handleEditClick}
            onDelete={handleDeleteHotel}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Add Hotel */}
        {currentView === "add" && (
          <HotelForm
            onSubmit={handleSubmit}
            onCancel={() => setCurrentView("list")}
          />
        )}

        {/* Edit Hotel */}
        {currentView === "edit" && editingHotel && (
          <HotelForm
            hotel={editingHotel}
            onSubmit={handleSubmit}
            onCancel={() => setCurrentView("list")}
            isEditing
          />
        )}
      </div>

      {/* View Hotel Modal */}
      {showModal && selectedHotel && (
        <HotelModal hotel={selectedHotel} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
