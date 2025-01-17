import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import {
  Calendar,
  DollarSign,
  Image as ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import Image from "next/image";

// Import Rich Text Editor dynamically to avoid SSR issues
const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse bg-gray-100 rounded-md" />
  ),
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // Add your API call here
      console.log("Auction Data:", auctionData);
    } catch (error) {
      console.error("Error creating auction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

//   const handleImageUpload = (url: string) => {
//     console.log("Uploaded image URL:", url);
//     // Do something with the URL (e.g., save to database)
//   };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Auction</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details to list your item for auction
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter auction title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      if (selectedCategories.includes(category.id)) {
                        setSelectedCategories((prev) =>
                          prev.filter((id) => id !== category.id)
                        );
                      } else {
                        setSelectedCategories((prev) => [...prev, category.id]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategories.includes(category.id)
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
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
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Auction image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {images.length < 8 && (
                <CldUploadWidget
                  uploadPreset="your-preset"
                  onUpload={handleImageUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="aspect-square w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors"
                    >
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        Add Image
                      </span>
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

        {/* <ImageUploads onUpload={handleImageUpload} /> */}

        {/* Price Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Price Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startingPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Starting Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="startingPrice"
                  id="startingPrice"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reservePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Reserve Price (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="reservePrice"
                  id="reservePrice"
                  min="0"
                  step="0.01"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Time Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Auction Timeline</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  name="startTime"
                  id="startTime"
                  required
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  name="endTime"
                  id="endTime"
                  required
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Description</h2>

          <Editor
            value={description}
            onChange={setDescription}
            className="min-h-[200px] prose max-w-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
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
