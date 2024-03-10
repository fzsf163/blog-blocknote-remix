import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFileUpload } from "~/utils/imageUploader";
import { Button } from "./ui/button";

type Data = {
  setThumbImg: React.Dispatch<React.SetStateAction<string>>;
};
export default function MyDropzone({ setThumbImg }: Data) {
  const { images, isUploading, submit } = useFileUpload();
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log("🚀 ~ onDrop ~ acceptedFiles:", acceptedFiles);

    // Do something with the files
    acceptedFiles.forEach((file: Blob) => {
      console.log("🚀 ~ acceptedFiles.forEach ~ file:", file);
      // const reader = new FileReader();
      // reader.onabort = () => console.log("file reading was aborted");
      // reader.onerror = () => console.log("file reading has failed");
      // reader.onload = () => {
      //   // Do whatever you want with the file contents
      //   const binaryStr = reader.;
      //   console.log(binaryStr);
      // };
      // reader.readAsArrayBuffer(file);
      //  stop image from going to server if size more than 5 mb
      if (file.size > 5_000_000) {
        console.log("error");
      } else {
        submit(acceptedFiles);
      }
    });
  }, []);

  useEffect(() => {
    if (images?.file?.url === "") return;
    setThumbImg(images?.file?.url);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/jpg": [],
      "image/webp": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "cursor-pointer rounded-sm bg-green-400 p-5 font-mono text-lg font-bold hover:bg-green-200 hover:text-black transition-all duration-150 ease-in-out",
      })}
    >
      <input
        {...getInputProps({
          className: "",
        })}
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {/* {images && (
        <div>
          <img className="mt-3 size-9/12 rounded" src={images?.file?.url}></img>
        </div>
      )} */}
    </div>
  );
}
