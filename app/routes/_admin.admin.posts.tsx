import type { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, json, useLoaderData } from "@remix-run/react";
import { Blog_Posts, columns } from "~/components/blog_table/columns";
import { DataTable } from "~/components/blog_table/data_table";
import { authenticator } from "~/utils/auth.server";
import { requireUserSession } from "~/utils/session.server";

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
  return "ok";
};

const blogs: Blog_Posts[] = [
  {
    author: "Emilie Parker",
    id: "b0473462-beea-5b2e-b613-e5192d0b60a9",
    read: 357,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "2 mins",
  },
  {
    author: "Jeffery Bowers",
    id: "da65548e-f24f-5be7-96c3-edffe12375f0",
    read: 275,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "22 mins",
  },
  {
    author: "Howard Benson",
    id: "5abceabe-24b1-5b3a-92ce-6c0d56f8b4e3",
    read: 335,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "23 mins",
  },
  {
    author: "Tillie Brooks",
    id: "bbdcbfb1-98a7-5f31-a947-50972626b1b7",
    read: 276,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "12 mins",
  },
  {
    author: "Emilie Parker",
    id: "b0473462-beea-5b2e-b613-e5192d0b60a9",
    read: 357,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "2 mins",
  },
  {
    author: "Jeffery Bowers",
    id: "da65548e-f24f-5be7-96c3-edffe12375f0",
    read: 275,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "22 mins",
  },
  {
    author: "Howard Benson",
    id: "5abceabe-24b1-5b3a-92ce-6c0d56f8b4e3",
    read: 335,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "23 mins",
  },
  {
    author: "Tillie Brooks",
    id: "bbdcbfb1-98a7-5f31-a947-50972626b1b7",
    read: 276,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "12 mins",
  },
  {
    author: "Emilie Parker",
    id: "b0473462-beea-5b2e-b613-e5192d0b60a9",
    read: 357,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "2 mins",
  },
  {
    author: "Jeffery Bowers",
    id: "da65548e-f24f-5be7-96c3-edffe12375f0",
    read: 275,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "22 mins",
  },
  {
    author: "Howard Benson",
    id: "5abceabe-24b1-5b3a-92ce-6c0d56f8b4e3",
    read: 335,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "23 mins",
  },
  {
    author: "Tillie Brooks",
    id: "bbdcbfb1-98a7-5f31-a947-50972626b1b7",
    read: 276,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "12 mins",
  },
  {
    author: "Emilie Parker",
    id: "b0473462-beea-5b2e-b613-e5192d0b60a9",
    read: 357,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "2 mins",
  },
  {
    author: "Jeffery Bowers",
    id: "da65548e-f24f-5be7-96c3-edffe12375f0",
    read: 275,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "22 mins",
  },
  {
    author: "Howard Benson",
    id: "5abceabe-24b1-5b3a-92ce-6c0d56f8b4e3",
    read: 335,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "23 mins",
  },
  {
    author: "Tillie Brooks",
    id: "bbdcbfb1-98a7-5f31-a947-50972626b1b7",
    read: 276,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "12 mins",
  },
  {
    author: "Emilie Parker",
    id: "b0473462-beea-5b2e-b613-e5192d0b60a9",
    read: 357,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "2 mins",
  },
  {
    author: "Jeffery Bowers",
    id: "da65548e-f24f-5be7-96c3-edffe12375f0",
    read: 275,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "22 mins",
  },
  {
    author: "Howard Benson",
    id: "5abceabe-24b1-5b3a-92ce-6c0d56f8b4e3",
    read: 335,
    status: "Visible",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "23 mins",
  },
  {
    author: "Tillie Brooks",
    id: "bbdcbfb1-98a7-5f31-a947-50972626b1b7",
    read: 276,
    status: "Hidden",
    title: "Yo yo world I am back",
    published: "Monday, February 12, 2024 at 2:18 AM",
    readTime: "12 mins",
  },
];
export default function Admin_Posts() {
  return (
    <div className="text-4xl text-green-200">
      <DataTable columns={columns} data={blogs}></DataTable>
    </div>
  );
}
