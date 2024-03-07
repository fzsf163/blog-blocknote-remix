import type { LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import {
  destroySession,
  getSession,
  requireUserSession,
  sessionStorage,
} from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const handle = {
  breadcrumb: () => <Link to="/admin/dashboard">Dashboard</Link>,
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session2 = await requireUserSession(request);
  // console.log("🚀 ~ loader ~ session2:", session2.get("userID"));
  // get the user data or redirect to /login if it failed
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });

  // if the user is authenticated, redirect to /dashboard
  // await authenticator.isAuthenticated(request, {
  //   successRedirect: "/admin/dashboard",
  // });
  // const session = await getSession(
  //   request.headers.get("Cookie"),
  // );
  const user = session2.data?.sessionKey?.userID;
  console.log("🚀 ~ loader ~ user:", user);

  const u = await db.user.findUnique({
    where: {
      id: user,
    },
  });
  return u;
};

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/admin" });
}
export default function Admin_Posts() {
  const u = useLoaderData<typeof loader>();
  console.log("🚀 ~ Admin_Posts ~ u:", u);
  return (
    <div className="text-4xl text-green-200">
      <h1>Admin Dashborad page , Welcome {u?.name}</h1>
      <Form method="POST">
        <Button type="submit">Logout</Button>
      </Form>
    </div>
  );
}
