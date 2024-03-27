import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  let userid = session.data?.sessionKey?.userID;
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  const u = await db.user.findMany({
    where: {
      id: userid,
    },
  });
  return u;
};

export default function Admin_Profile() {
  const laoderData = useLoaderData<typeof loader>();
  console.log("🚀 ~ Admin_Profile ~ laoderData:", laoderData);
  return (
    <div className="border w-[1250px] px-3 py-5">
      <h1 className="font-mono text-xl font-bold text-left">Profile Section</h1>
      <div>
        
      </div>
    </div>
  );
}
