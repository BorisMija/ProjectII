"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Trash } from "lucide-react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    console.log('ImageUpload onUpload result:', result);
    console.log('ImageUpload secure_url:', result.info.secure_url);
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="daomvoope">
        {({ open }) => {
          const onClick = () => {
            if (!disabled) {
              open();
            }
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              >
              <ImagePlus className="mr-2 h-4 w-4" />
                Upload an image
              </Button>
             
              
            

          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;