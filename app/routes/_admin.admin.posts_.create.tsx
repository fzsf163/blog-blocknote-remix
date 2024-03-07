import { MetaFunction } from "@remix-run/react";
import MyDropzone from "~/components/dragNdrop.client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ClientOnly } from "remix-utils/client-only";
import { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import EditorBlockNote from "~/components/blockNote.client";
import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { requireUserSession } from "~/utils/session.server";
export const meta: MetaFunction = () => {
  return [
    { title: "admin/create page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// export const handle = {
//   breadcrumb: () => <Link to="/admin/posts/create">Create Post</Link>,
// };
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  return "ok";
};
export default function Admin_Posts_Create() {
  const [data, setData] = useState<string>();
  console.log("🚀 ~ Admin_Posts_Create ~ data:", data);
  return (
    <div className="h-auto w-full space-y-3 rounded-md p-8 text-white [&_input]:bg-black [&_input]:focus-within:ring-0">
      <h1 className="text-2xl">Let's Add an blog</h1>
      <hr />
      <div className="space-y-3">
        <Label htmlFor="title_blog" className="text-xl font-bold capitalize  ">
          Title for your blog
        </Label>
        <Input id="title_blog" title="Title" className="  p-6 text-lg "></Input>
      </div>
      <div className="space-y-3">
        <Label htmlFor="subtitle_blog" className="text-xl font-bold capitalize">
          Sub Title for your blog (optional)
        </Label>
        <Input
          id="subtitle_blog"
          title="subtitle"
          className="p-6 text-lg "
        ></Input>
      </div>
      <div className="space-y-3">
        <Label htmlFor="keywords_blog" className="text-xl font-bold capitalize">
          KeyWords
        </Label>
        <Input
          id="keywords_blog"
          title="keywords"
          className="p-6 text-lg "
        ></Input>
      </div>
      <div className="space-y-3">
        <Label htmlFor="readtime_blog" className="text-xl font-bold capitalize">
          readtime_blog
        </Label>
        <Input
          id="readtime_blog"
          title="keywords"
          className="p-6 text-lg "
        ></Input>
      </div>
      <div className="space-y-3">
        <h5 className="text-lg font-bold">Add a thumbnail</h5>
        <ClientOnly fallback={<div>Loading....</div>}>
          {() => <MyDropzone></MyDropzone>}
        </ClientOnly>
      </div>
      <div className="space-y-3">
        <h5 className="text-lg font-bold">Add Blog Content</h5>
        <ClientOnly fallback={<p>Loading....</p>}>
          {() => <EditorBlockNote setData={setData}></EditorBlockNote>}
        </ClientOnly>
      </div>
    </div>
  );
}
