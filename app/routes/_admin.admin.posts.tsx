import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  MetaFunction,
  json,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { Blog_Posts, columns } from "~/components/blog_table/columns";
import { DataTable } from "~/components/blog_table/data_table";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";
import { BlogSereverDataModel } from "./_admin.admin.posts_.create";
import { useEffect, useTransition } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// export const handle = {
//   breadcrumb: () => <Link to="/admin/posts">Posts</Link>,
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });

  let data = await db.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  if (data) {
    return json({ data });
  }
  return json({ data: "Nothing found" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      return json({ method: "Post" });
    }
    case "PUT": {
      return json({ method: "Put" });
    }
    case "PATCH": {
      return json({ method: "Patch" });
    }
    case "DELETE": {
      let d = await request.json();
      try {
        await db.post.delete({
          where: {
            id: d?.id,
          },
        });
        return json({ Delete: "Successful" });
      } catch (error) {
        (e: any) => {
          return { e };
        };
      }
      break;
    }
  }
};

export default function Admin_Posts() {
  const userLoaderData = useLoaderData<typeof loader>();
  const blogsFromdb = userLoaderData.data;
  let blogs: Blog_Posts[] = [];
  if (typeof blogsFromdb === "object") {
    blogsFromdb.forEach((x) => {
      return blogs.push({
        author: x.author.name ? x.author.name : "Name was not given",
        id: x.id,
        title: x.title,
        status: x.published ? "Visible" : "Hidden",
        read: x.readCount,
        published: x.createdAt,
        readTime: x.readTime,
      });
    });
  }

  // console.log("🚀 ~ Admin_Posts ~ blgs:", blogs);

  return (
    <div className="w-[1400px]">
      <DataTable columns={columns} data={blogs}></DataTable>
    </div>
  );
}
