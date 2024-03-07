import { useFetcher } from "@remix-run/react";
import { action } from "~/routes/api.image";

export function useFileUpload() {
  let { submit, data, state, formData } = useFetcher<typeof action>({
    key: "img-upload-fetcher",
  });
  let isUploading = state !== "idle";
  // let uploadingFiles = formData
  //   ?.getAll("image")
  //   ?.filter((value: unknown): value is File => value instanceof File)
  //   .map((file) => {
  //     let name = file.name;
  //     let size = file.size;
  //     // This line is important; it will create an Object URL, which is a `blob:` URL string
  //     // We'll need this to render the image in the browser as it's being uploaded
  //     let url = URL.createObjectURL(file);
  //     return { name, url, size };
  //   });

  let images = data ?? [];

  return {
    submit(files: FileList | null) {
      if (!files) return;
      let formData = new FormData();
      for (let file of files) formData.append("image", file);
      submit(formData, {
        method: "POST",
        encType: "multipart/form-data",
        action: "/api/image",
      });
    },
    isUploading,
    images,
  };
}
