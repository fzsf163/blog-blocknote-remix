import type { ActionFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useFetcher, useNavigate } from "@remix-run/react";

import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession, requireUserSession } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import Blog_Form_box from "~/components/blog_create_form";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import parse from "html-react-parser";
export const meta: MetaFunction = () => {
  return [
    { title: "admin/create page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
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
  let date = new Date().toLocaleString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  console.log("🚀 ~ action ~ date:", date);
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
          createdAt: date,
          published: published,
          updatedAt: "",
        },
      });
    } catch {
      (error: any) => {
        throw new Response(error);
      };
    }
    return json({ data_Submission: true });
  }
  return { error: "Did not create" };
};
type data_Submission = boolean;
type error = any;
type submission = data_Submission | error;
export default function Admin_Posts_Create() {
  const { toast } = useToast();
  const fetcher = useFetcher();
  const state = fetcher.state;
  const d: submission = fetcher.data;
  const [html, setHTML] = useState<string | undefined>("");

  const [data, setData] = useState<string | undefined>("");
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

  const resteData = () => {
    setData(undefined);
    setThumbImg("");
    setBlogData({ title: "", keywords: "", readtime: "", subtitle: "" });
    setCategory({ c1: "", c2: "", c3: "" });
  };
  useEffect(() => {
    if (d?.data_Submission !== undefined) {
      if (d?.data_Submission === true) {
        toast({
          title: "Post Has been Created",
          description: "Your post has been successfully added",
          action: (
            <Button>
              <Link to={`/admin/posts`}>See All Post</Link>
            </Button>
          ),
        });
      }
    }
  }, [d?.data_Submission]);
  return (
    <div className="  h-[100dvh] w-[1250px]  ">
      <h1 className="mb-2 font-mono text-2xl font-bold ">Make a Post</h1>
      <hr />

      <Tabs defaultValue="postmaker" className="mt-5 w-full">
        <TabsList className="">
          <TabsTrigger value="postmaker">POST</TabsTrigger>
          <TabsTrigger value="preview">PREVIEW</TabsTrigger>
        </TabsList>
        <TabsContent value="postmaker">
          {state === "submitting" ? (
            <p>Submitting Post</p>
          ) : (
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
              resetData={resteData}
              setHTML={setHTML}
              html={html}
            ></Blog_Form_box>
          )}
        </TabsContent>
        <TabsContent value="preview">
          {" "}
          {/* <div
            id="blog-post-html"
            className="prose  w-full border"
            dangerouslySetInnerHTML={{ __html: html! }}
          /> */}
          <div id="blog-post-html">{parse(html!)}</div>
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  );
}
