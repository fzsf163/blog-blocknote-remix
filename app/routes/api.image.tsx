import type { LoaderFunctionArgs } from "@remix-run/node";

import {
  ActionFunctionArgs,
  NodeOnDiskFile,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ loader: request });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // console.log("🚀 ~ action ~ request:", request);
  switch (request.method) {
    case "POST": {
      /* handle "POST" */
      let formData = await unstable_parseMultipartFormData(
        request,
        unstable_composeUploadHandlers(
          unstable_createFileUploadHandler({
            // Limit file upload to images
            filter({ contentType }) {
              return contentType.includes("image");
            },
            // Store the images in the public/img folder
            directory: "./public/img",
            // By default, `unstable_createFileUploadHandler` adds a number to the file
            // names if there's another with the same name; by disabling it, we replace
            // the old file
            avoidFileConflicts: false,
            // Use the actual filename as the final filename
            file: ({ filename }) => {
              const fname = filename.split(" ").join("_");
              return fname;
            },
            // Limit the max size to 10MB
            maxPartSize: 10_000_000,
          }),
          unstable_createMemoryUploadHandler(),
        ),
      );

      console.log(formData);

      let files = formData.get("image") as NodeOnDiskFile;

      return json({
        success: 1,
        file: {
          url: `/img/${files.name}`,
        },
      });
    }
    case "PUT": {
      /* handle "PUT" */
      return new Response("PUTTT");
    }
    case "PATCH": {
      /* handle "PATCH" */
      return new Response("PATCHHHHH");
    }
    case "DELETE": {
      /* handle "DELETE" */
      return new Response("DELEETETEE");
    }
  }
};
