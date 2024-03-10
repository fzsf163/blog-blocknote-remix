import type { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, json, useLoaderData } from "@remix-run/react";
import { Blog_Posts, columns } from "~/components/blog_table/columns";
import { DataTable } from "~/components/blog_table/data_table";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";
import { BlogSereverDataModel } from "./_admin.admin.posts_.create";

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

  let data = await db.post.findMany({ include: { author: {} } });
  if (data) {
    return json({ data });
  }
  return json({ data: "Nothing found" });
};

export default function Admin_Posts() {
  const userLoaderData = useLoaderData<typeof loader>();
  const blogsFromdb = userLoaderData.data;
  console.log("🚀 ~ Admin_Posts ~ userLoaderData:", blogsFromdb);
  let blgs: Blog_Posts[] = [];
  if (typeof blogsFromdb === "object") {
    blogsFromdb.forEach((x) => {
      return blgs.push({
        author: x.author.name!,
        id: x.id,
        title: x.title,
        status: x.published ? "Visible" : "Hidden",
        read: x.readCount,
        published: x.createdAt,
      });
    });
  }
  console.log("🚀 ~ Admin_Posts ~ blgs:", blgs);
  return (
    <div className="text-4xl text-green-200">
      <DataTable columns={columns} data={blgs}></DataTable>
    </div>
  );
}
