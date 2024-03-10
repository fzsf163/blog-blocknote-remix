import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, MetaFunction, useNavigate, useSubmit } from "@remix-run/react";
import MyDropzone from "~/components/dragNdrop.client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ClientOnly } from "remix-utils/client-only";
import { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import EditorBlockNote from "~/components/blockNote.client";
import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/utils/session.server";
import { DropdownMenuCheckboxesCategory } from "~/components/categoryCheckbox";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const k = await request.json();
  if (k) {
    console.log(k);
  }
  return { ok: "OK" };
};

export default function Admin_Posts_Create() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const [data, setData] = useState<string>("");
  const [thumbImg, setThumbImg] = useState<string>("");

  const [category, setCategory] = useState({
    c1: "",
    c2: "",
    c3: "",
  });

  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    keywords: "",
    readtime: "",
  });
  const handleClick = () => {
    navigate(".", { replace: true });
  };

  console.log("🚀 ~ Admin_Posts_Create ~ thumbImg:", thumbImg);
  // console.log("🚀 ~ Admin_Posts_Create ~ data:", data);
  // console.log("🚀 ~ Admin_Posts_Create ~ values:", values);
  let uuid = crypto.randomUUID();

  return (
    <div className="h-auto w-full space-y-7 rounded-md p-8 text-black [&_input]:ring-offset-black [&_input]:focus-within:ring-0 [&_input]:focus-within:ring-black [&_input]:focus-visible:ring-0 [&_label]:font-mono [&_textarea]:max-w-full  [&_textarea]:rounded-sm   [&_textarea]:bg-white/80 [&_textarea]:font-mono [&_textarea]:font-bold [&_textarea]:placeholder:font-semibold">
      <h1 className="text-3xl font-bold">Blog Creation</h1>
      <hr />
      <div className="space-y-3">
        <Label htmlFor="title_blog" className="text-lg font-bold capitalize  ">
          Title for your blog
        </Label>
        <Textarea
          placeholder="Enter a Title for your blog"
          id="title_blog"
          title="Title"
          className="p-6  text-lg "
          value={blogData.title}
          onChange={(x) =>
            setBlogData({ ...blogData, title: x.currentTarget.value })
          }
        ></Textarea>
      </div>
      <div className="space-y-3">
        <Label htmlFor="subtitle_blog" className="text-lg font-bold capitalize">
          Sub Title for your blog (optional)
        </Label>
        <Textarea
          id="subtitle_blog"
          title="subtitle"
          className="p-6 text-lg "
          placeholder="Enter a subtitle for your blog"
          value={blogData.subtitle}
          onChange={(x) =>
            setBlogData({ ...blogData, subtitle: x.currentTarget.value })
          }
        ></Textarea>
      </div>
      <div className="space-y-3">
        <Label htmlFor="keywords_blog" className="text-lg font-bold capitalize">
          Key Words
        </Label>
        <Textarea
          id="keywords_blog"
          title="keywords"
          className="p-6 text-lg "
          placeholder="Enter some key words, separated by comma"
          value={blogData.keywords}
          onChange={(x) =>
            setBlogData({ ...blogData, keywords: x.currentTarget.value })
          }
        ></Textarea>
      </div>
      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-start gap-5">
          <Label className="text-lg font-bold capitalize">Category</Label>
          <DropdownMenuCheckboxesCategory
            values={category}
            setValues={setCategory}
          ></DropdownMenuCheckboxesCategory>
        </div>
        <div className="flex items-center justify-start gap-5">
          <Label
            htmlFor="readtime_blog"
            className="text-nowrap text-lg font-bold capitalize"
          >
            read time
          </Label>
          <Input
            id="readtime_blog"
            title="readTime"
            className="p-6 text-lg"
            placeholder="e.g. 2 mintues 34 seconds"
            value={blogData.readtime}
            onChange={(x) =>
              setBlogData({ ...blogData, readtime: x.currentTarget.value })
            }
          ></Input>
        </div>
      </div>
      <div className="space-y-3">
        <h5 className="font-mono text-lg font-bold">Add a thumbnail</h5>
        <ClientOnly fallback={<div>Loading....</div>}>
          {() => <MyDropzone setThumbImg={setThumbImg}></MyDropzone>}
        </ClientOnly>
        {thumbImg && (
          <div className="relative">
            <Button
              variant={"ghost"}
              className="absolute  left-5 top-5 rounded border  border-white bg-transparent font-extrabold text-white"
              onClick={() => setThumbImg("")}
            >
              X
            </Button>
            <img src={thumbImg} className="mt-3 size-9/12 rounded"></img>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h5 className="font-mono text-lg font-bold">Add Blog Content</h5>
        <ClientOnly fallback={<p>Loading....</p>}>
          {() => <EditorBlockNote setData={setData}></EditorBlockNote>}
        </ClientOnly>
      </div>
      <hr />
      <div className="flex items-start justify-end gap-5">
        <Form navigate={false}>
          <Button
            disabled={data ? false : true}
            onClick={() =>
              submit(
                { values: category, blogData, thumbImg, data, published: true },
                {
                  encType: "application/json",
                  navigate: false,
                  preventScrollReset: true,
                  method: "POST",
                },
              )
            }
          >
            Submit & Publish
          </Button>
        </Form>
        <Form>
          <Button
            disabled={data ? false : true}
            onClick={() =>
              submit(
                {
                  values: category,
                  blogData,
                  thumbImg,
                  data,
                  published: false,
                },
                {
                  encType: "application/json",
                  navigate: false,
                  preventScrollReset: true,
                  method: "POST",
                },
              )
            }
          >
            Submit as Draft
          </Button>
        </Form>
        <Button onClick={handleClick}>Discard Post</Button>
      </div>
    </div>
  );
}
