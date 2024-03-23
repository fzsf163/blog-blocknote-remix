import type { ActionFunctionArgs } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  MetaFunction,
  json,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
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

type PATCH_POST = {
  category: { c1: string; c2: string; c3: string };
  blogData: {
    title: string;
    keywords: string;
    readtime: string;
    subtitle: string;
  };
  data: string;
  published: boolean;
  thumbImg: string;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id_of_post = params?.id;
  const x = await request.json();
  console.log("🚀 ~ action ~ x:", x);
  const { category, blogData, data, published, thumbImg }: PATCH_POST = x;
  let cat = JSON.stringify(category);
  switch (request.method) {
    case "POST": {
      return new Response("post does not work here");
    }
    case "PATCH": {
      try {
        await db.post.update({
          data: {
            title: blogData?.title,
            subTitle: blogData?.subtitle,
            readTime: blogData?.readtime,
            keywords: blogData?.keywords,
            category: cat,
            published: published,
            content: data,
            thumbnail: thumbImg,
          },
          where: {
            id: id_of_post,
          },
        });
        return json({ data_Submission: true });
      } catch (error) {
        return error;
      }
    }
    case "PUT": {
      return new Response("Put does not work in this route");
    }
    case "DELETE": {
      return new Response("DELETE does not work in this route");
    }
  }
};
type data_Submission = boolean;
type error = any;
type submission = data_Submission | error;
export default function Admin_Posts_Edit_One() {
  const post = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const d: submission = fetcher.data;

  //@ts-ignore
  // console.log("🚀 ~ Admin_Posts_Edit_One ~ post:", post?.thumbanail);

  const [data, setData] = useState<string>("");
  const [thumbImg, setThumbImg] = useState<string>("");
  //@ts-ignore
  const thumb = post?.thumbnail;
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
      //@ts-ignore
      let c = JSON.parse(post?.category);
      setCategory({ c1: c?.c1, c2: c?.c2, c3: c?.c3 });
      setBlogData({
        //@ts-ignore
        title: post?.title,
        //@ts-ignore
        keywords: post?.keywords,
        //@ts-ignore
        readtime: post?.readTime,
        //@ts-ignore
        subtitle: post?.subTitle,
      });
      //@ts-ignore
      setThumbImg(post?.thumbnail);
    }
  }

  return (
    <div className="  h-[100dvh] w-[1250px] ">
      <h1 className="mb-2 font-mono text-2xl font-bold text-white/90">
        {" "}
        Edit a Post
      </h1>
      <hr />
      <Blog_Form_box
        blogData={blogData}
        category={category}
        data={data}
        setBlogData={setBlogData}
        setCategory={setCategory}
        setData={setData}
        setThumbImg={setThumbImg}
        thumbImg={thumbImg === undefined ? thumb : thumbImg}
        method="PATCH"
        fetcher={fetcher}
      ></Blog_Form_box>
    </div>
  );
}
