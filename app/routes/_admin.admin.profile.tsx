import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

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
  const u = await db.user.findUnique({
    where: {
      id: userid,
    },
  });
  return u;
};
type user = {
  id: string;
  email: string;
  password: string;
  name: string | null;
  image: string | null;
  bio: string | null;
};
export default function Admin_Profile() {
  const data = useLoaderData<typeof loader>();

  const { bio, email, id, image, name, password }: user = data!;

  console.log("🚀 ~ Admin_Profile ~ laoderData:", email);
  return (
    <div className="w-[1250px] border px-3 py-5">
      <h1 className="text-left font-mono text-xl font-bold">Profile Section</h1>
      <br />
      <div className="flex items-center justify-center gap-4">
        <div className="">
          <Avatar className="size-64">
            <AvatarImage src={image!} />
            <AvatarFallback className="text-black">
              {name?.substring(0, 1) ?? "P"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <h1 className="text-xl font-bold">{name ?? "Not found"}</h1>
          <h2>{email ?? "Not found"}</h2>
          <p>{bio ?? "Not found"}</p>
          <p>Update Password</p>
          <p>{password}</p>
        </div>
      </div>
    </div>
  );
}
