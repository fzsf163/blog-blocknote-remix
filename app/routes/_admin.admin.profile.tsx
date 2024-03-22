import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { authenticator } from "~/utils/auth.server";
import { requireUserSession } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  let userid = session.data?.sessionKey?.userID;
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  return userid;
};

export default function Admin_Profile() {
  const laoderData = useLoaderData<typeof loader>();
  return <div>Welocome to admin profile {laoderData}</div>;
}
