import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  onUpload?: (url: string) => void;
}

// Define the Cloudinary upload result type
interface CloudinaryResult {
  info: {
    secure_url: string;
  };
  event?: string;
}

interface CloudinaryWidgetRenderProps {
  open: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUploadSuccess = (result: CloudinaryResult) => {
    if (result.event !== "success") return;

    const secureUrl = result.info.secure_url;
    setImageUrl(secureUrl);

    if (onUpload) {
      onUpload(secureUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <CldUploadWidget
        uploadPreset="your_upload_preset" // Replace with your upload preset
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpload={(result: any) =>
          handleUploadSuccess(result as CloudinaryResult)
        }
      >
        {({ open }: CloudinaryWidgetRenderProps) => (
          <button
            onClick={() => open()}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            type="button"
          >
            Upload Image
          </button>
        )}
        {/* options=
        {{
          maxFiles: 1, // Maximum number of files
          sources: ["local", "url", "camera"], // Upload sources
          resourceType: "image", // Restrict to images only
          maxFileSize: 10000000, // Max file size in bytes
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
            },
          },
        }} */}
      </CldUploadWidget>

      {imageUrl && (
        <div className="relative w-64 h-64">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            fill
            className="object-cover rounded"
            sizes="(max-width: 256px) 100vw, 256px"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
