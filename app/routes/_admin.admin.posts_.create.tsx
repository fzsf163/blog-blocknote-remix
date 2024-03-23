import type { ActionFunctionArgs } from "@remix-run/node";
import {
  MetaFunction,
  useActionData,
  useFetcher,
  useNavigate,
  useSubmit,
} from "@remix-run/react";

import { json } from "@remix-run/node";
import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession, requireUserSession } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import Blog_Form_box from "~/components/blog_create_form";
import { error } from "console";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/create page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// export const handle = {
//   breadcrumb: () => <Link to="/admin/posts/create">Create Post</Link>,
// };
// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  return "ok";
};

export type BlogSereverDataModel = {
  category: {
    c1: string;
    c2: string;
    c3: string;
  };
  blogData: {
    title: string;
    subtitle: string;
    keywords: string;
    readtime: string;
  };
  thumbImg: string;
  data: string;
  published: boolean;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const k: BlogSereverDataModel = await request.json();
  const { blogData, data, published, thumbImg, category } = k;
  let cat = JSON.stringify(category);
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.data?.sessionKey?.userID;

  switch (request.method) {
    case "POST": {
      if (k) {
        try {
          await db.post.create({
            data: {
              title: blogData.title,
              subTitle: blogData.subtitle,
              keywords: blogData.keywords,
              readTime: blogData.readtime,
              category: cat,
              thumbnail: thumbImg,
              authorId: user,
              content: data,
              published: published,
            },
          });
          return json({ data_Submission: true });
        } catch {
          (error: any) => {
            throw new Response(error);
          };
        }
      }
    }
    case "PATCH": {
      return new Response("Patch does not work in this route");
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
export default function Admin_Posts_Create() {
  const fetcher = useFetcher();
  const d: submission = fetcher.data;

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

  // console.log("🚀 ~ Admin_Posts_Create ~ thumbImg:", thumbImg);
  // console.log("🚀 ~ Admin_Posts_Create ~ data:", data);
  // console.log("🚀 ~ Admin_Posts_Create ~ values:", values);

  return (
    <div className="  h-[100dvh] w-[1250px]  ">
      <h1 className="mb-2 font-mono text-2xl font-bold text-white/90">
        {" "}
        Make a Post
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
        thumbImg={thumbImg}
        method="POST"
        fetcher={fetcher}
      ></Blog_Form_box>
    </div>
  );
}
