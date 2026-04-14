"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Calendar, Image as ImageIcon, X, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import Image from "next/image";
import { analytics } from "@/hooks/useAnalytics";

// Import Rich Text Editor dynamically to avoid SSR issues
const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-md bg-gray-100" />,
});

interface CategoryOption {
  id: string;
  name: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "art", name: "Art & Collectibles" },
  { id: "jewelry", name: "Jewelry & Watches" },
  { id: "vehicles", name: "Vehicles" },
  { id: "real-estate", name: "Real Estate" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion & Accessories" },
];

export default function CreateAuctionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const handleImageUpload = (result: any) => {
    console.log("result :>> ", result);
    setImages((prev) => [...prev, result.info.secure_url]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const auctionData = {
      title: formData.get("title"),
      description,
      startingPrice: Number(formData.get("startingPrice")),
      reservePrice: Number(formData.get("reservePrice")),
      startTime: new Date(formData.get("startTime") as string),
      endTime: new Date(formData.get("endTime") as string),
      status: "DRAFT",
      images,
      category: selectedCategories,
      currentPrice: Number(formData.get("startingPrice")),
    };

    try {
      const response = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auctionData),
      });

      if (response.ok) {
        const result = await response.json();

        // Track auction creation
        analytics.trackAuctionCreated(
          auctionData.category as string[],
          auctionData.startingPrice as number
        );

        alert("Auction created successfully!");
        window.location.href = "/auctions";
      } else {
        alert("Failed to create auction");
      }
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Error creating auction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Auction</h1>
        <p className="mt-2 text-gray-600">Fill in the details to list your item for auction</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                placeholder="Enter auction title"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Categories</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      if (selectedCategories.includes(category.id)) {
                        setSelectedCategories((prev) => prev.filter((id) => id !== category.id));
                      } else {
                        setSelectedCategories((prev) => [...prev, category.id]);
                      }
                    }}
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedCategories.includes(category.id)
                        ? "border-red-200 bg-red-100 text-red-800"
                        : "border-gray-200 bg-gray-100 text-gray-800"
                    } border`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Images</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Auction image ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                    width={200}
                    height={200}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {images.length < 8 && (
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={handleImageUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-red-500"
                    >
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Add Image</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Upload up to 8 images. First image will be the cover.
            </p>
          </div>
        </div>

        {/* Price Settings */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Price Settings</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700">
                Starting Price
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  name="startingPrice"
                  id="startingPrice"
                  required
                  min="0"
                  step="1"
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none focus:ring-red-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reservePrice" className="block text-sm font-medium text-gray-700">
                Reserve Price (Optional)
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  name="reservePrice"
                  id="reservePrice"
                  min="0"
                  step="1"
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none focus:ring-red-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Time Settings */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Auction Timeline</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  name="startTime"
                  id="startTime"
                  required
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  name="endTime"
                  id="endTime"
                  required
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Description</h2>

          <Editor
            value={description}
            onChange={setDescription}
            className="prose min-h-[200px] max-w-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center rounded-md border border-transparent bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Auction"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
