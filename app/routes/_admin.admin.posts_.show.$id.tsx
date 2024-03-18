import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, json, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
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
  return json(params);
};

export default function Admin_Posts_Show_One() {
  const { id } = useLoaderData<typeof loader>();
  return (
    <div className="h-[100dvh] w-[1500px]">
      <h1> Show Post with {id} page</h1>
    </div>
  );
}
