import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  MetaFunction,
  useActionData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import MyDropzone from "~/components/dragNdrop.client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ClientOnly } from "remix-utils/client-only";
import { json } from "@remix-run/node";
import EditorBlockNote from "~/components/blockNote.client";
import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession, requireUserSession } from "~/utils/session.server";
import { DropdownMenuCheckboxesCategory } from "~/components/categoryCheckbox";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { db } from "~/utils/db.server";
import Blog_Form_box from "~/components/blog_create_form";

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
        console.log(k);
        try {
          await db.post.create({
            data: {
              title: blogData.title,
              subTitle: blogData.subtitle,
              keywords: blogData.keywords,
              readTime: blogData.readtime,
              category: cat,
              thumbanail: thumbImg,
              authorId: user,
              content: data,
              published: published,
            },
          });
        } catch {
          (error: any) => {
            throw new Response(error);
          };
        }
        return json({ data_Submission: "successful" });
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

  return { successful: "nah mate" };
};

export default function Admin_Posts_Create() {
  const userActionData = useActionData<typeof action>();
  console.log("🚀 ~ Admin_Posts_Create ~ userActionData:", userActionData);
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

  // console.log("🚀 ~ Admin_Posts_Create ~ thumbImg:", thumbImg);
  // console.log("🚀 ~ Admin_Posts_Create ~ data:", data);
  // console.log("🚀 ~ Admin_Posts_Create ~ values:", values);

  return (
    <div>
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
        method="POST"
      ></Blog_Form_box>
    </div>
  );
}
