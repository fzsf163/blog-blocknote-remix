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
import { DropdownMenuCheckboxesCategory } from "~/components/categoryCheckbox";
import { Button } from "~/components/ui/button";

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
  const [values, setValues] = useState({
    v1: "",
    v2: "",
    v3: "",
  });
  console.log("🚀 ~ Admin_Posts_Create ~ data:", data);
  console.log("🚀 ~ Admin_Posts_Create ~ values:", values);
  return (
    <div className="h-auto w-full space-y-7 rounded-md p-8 text-black [&_input]:bg-white [&_input]:focus-within:ring-0">
      <h1 className="text-3xl font-bold">Blog Creation</h1>
      <hr />
      <div className="space-y-3">
        <Label htmlFor="title_blog" className="text-xl font-bold capitalize  ">
          Title for your blog
        </Label>
        <Input
          placeholder="Enter a Title for your blog"
          id="title_blog"
          title="Title"
          className="  p-6 text-lg "
        ></Input>
      </div>
      <div className="space-y-3">
        <Label htmlFor="subtitle_blog" className="text-xl font-bold capitalize">
          Sub Title for your blog (optional)
        </Label>
        <Input
          id="subtitle_blog"
          title="subtitle"
          className="p-6 text-lg "
          placeholder="Enter a subtitle for your blog"
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
          placeholder="Enter some key words, separated by comma"
        ></Input>
      </div>
      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-start gap-5">
          <Label
            htmlFor="category_blog"
            className="text-xl font-bold capitalize"
          >
            Category
          </Label>
          <DropdownMenuCheckboxesCategory
            values={values}
            setValues={setValues}
          ></DropdownMenuCheckboxesCategory>
        </div>
        <div className="flex items-center justify-start gap-5">
          <Label
            htmlFor="readtime_blog"
            className="text-nowrap text-xl font-bold capitalize"
          >
            readtime blog
          </Label>
          <Input
            id="readtime_blog"
            title="keywords"
            className="p-6 text-lg"
            placeholder="e.g. 2 mintues 34 seconds"
          ></Input>
        </div>
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
      <hr />
      <div className="flex items-start justify-end gap-5">
        <Button disabled={data ? false : true}>Submit & Publish</Button>
        <Button>Submit & Draft</Button>
        <Button>Discard</Button>
      </div>
    </div>
  );
}
