import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData, useSubmit } from "@remix-run/react";
import { SetStateAction, useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import EditorBlockNote from "~/components/blockNote.client";
import Blog_Form_box from "~/components/blog_create_form";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  let id = params?.id;
  console.log("🚀 ~ loader ~ id:", id);
  try {
    let post = await db.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {}
  return { post: "None Found" };
};

export default function Admin_Posts_Edit_One() {
  const post = useLoaderData<typeof loader>();
  const submit = useSubmit();
  console.log("🚀 ~ Admin_Posts_Edit_One ~ post:", post);
  // let p: string | undefined;

  const [data, setData] = useState<string>("");
  console.log("🚀 ~ Admin_Posts_Edit_One ~ data:", data)
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


  if (data === "") {
    if (typeof post === "object") {
      //@ts-ignore
      setData(post?.content);
    }
  }


  return (
    <div className="">
      <h1 className="mb-2 font-mono text-2xl"> Edit a Post</h1>
      <hr />
      <Blog_Form_box
        blogData={blogData}
        category={category}
        data={data}
        setBlogData={setBlogData}
        setCategory={setCategory}
        setData={setData}
        setThumbImg={setThumbImg}
        submit={submit}
        thumbImg={thumbImg}
      ></Blog_Form_box>
    </div>
  );
}
