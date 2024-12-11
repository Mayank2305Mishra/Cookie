import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import { ImageUp } from "lucide-react";
import { Models } from "appwrite";

type ImgProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

type PostFormProps = {
  post?: Models.Document;
};

const ImgUploader = ({ fieldChange, mediaUrl }: ImgProps) => {
    const [img, setImg] = useState<File[]>([]);
    const [imgUrl, setImgUrl] = useState<string>(mediaUrl);
    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
          setImg(acceptedFiles);
          fieldChange(acceptedFiles);
          setImgUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [img]
      );
    
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          "image/*": [".png", ".jpeg", ".jpg",".avif"],
        },
      });
    
      return (
        <div
          {...getRootProps()}
          className="flex flex-center flex-col bg-black-4 rounded-xl cursor-pointer">
          <input {...getInputProps()} className="cursor-pointer" />
    
          {imgUrl ? (
            <>
              <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                <img src={imgUrl} alt="image" className=" h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top" />
              </div>
              <p className="text-white-4 text-center small-regular w-full p-4 border-t border-t-black-4">Click or drag photo to replace</p>
            </>
          ) : (
            <div className="flex-center flex-col p-7 h-80 lg:h-[312px]">
              <ImageUp className="w-12 h-12" />
    
              <h3 className="base-medium text-white-2 mb-2 mt-6">
                Drag photo here
              </h3>
              <p className="text-white-4 small-regular mb-6">SVG, PNG, JPG</p>
    
              <Button type="button" className="h-12 bg-black-3 p-4 text-white-1 flex gap-2">
                Select from computer
              </Button>
            </div>
          )}
        </div>
      );
}

export default ImgUploader
