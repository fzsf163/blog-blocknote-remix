import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFileUpload } from "~/utils/imageUploader";

type FILE = {
  path: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath?: string;
  size: number;
  type: string;
};
export default function MyDropzone() {
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
    <div {...getRootProps({className:"cursor-pointer"})}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="rounded-sm bg-green-400 p-5 font-mono text-lg font-bold">
          Drop the files here ...
        </p>
      ) : (
        <p className="rounded-sm bg-green-400 p-5 font-mono text-lg font-bold">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
      {images && <img className="size-9/12 mt-3 rounded" src={images?.file?.url}></img>}
    </div>
  );
}
