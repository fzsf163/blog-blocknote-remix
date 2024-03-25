import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, json, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });

  const p = await db.post.findUnique({
    where: {
      id: params?.id,
    },
  });
  return json(p);
};

export default function Admin_Posts_Show_One() {
  const p = useLoaderData<typeof loader>();
  console.log("🚀 ~ Admin_Posts_Show_One ~ p:", p);
  const parsedJson = JSON.parse(p?.content!);
  console.log("🚀 ~ Admin_Posts_Show_One ~ parsedJson:", parsedJson);
  return (
    <div className="h-[100dvh] w-[1500px]">
      <h1> Show Post with {p?.id} page</h1>
    </div>
  );
}
