import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, json, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin",
  });
  return json(params);
};

export default function Admin_Posts_Edit_One() {
  const { id } = useLoaderData<typeof loader>();
  console.log("🚀 ~ Admin_Posts_Edit_One ~ id:", id);
  return (
    <div className="text-4xl text-green-200">
      <h1>Admin Edit {id} page</h1>
    </div>
  );
}
