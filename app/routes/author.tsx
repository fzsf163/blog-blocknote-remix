import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction } from "@remix-run/node";
import { MetaFunction } from "@remix-run/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import EditorBlockNote from "~/components/blockNote.client";

export const meta: MetaFunction = () => {
  return [
    { title: "author page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
export default function Author_View() {
  const [data, setData] = useState<string>("");
  return (
    <div className="text-4xl text-green-600">
      <h1>Author page</h1>
      <div className="mt-10 w-[50%] mx-auto">
        <ClientOnly fallback={<p>Loading....</p>}>
          {() => (
            <EditorBlockNote
              key={"edit-post-one"}
              data={data}
              setData={setData}
            ></EditorBlockNote>
          )}
        </ClientOnly>
      </div>
    </div>
  );
}
