import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const session = await requireUserSession(request);
  // return json({ login: session });
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin",
  });
  return "ok";
};

export default function Admin_Profile() {
  return <div>Welocome to admin profile</div>;
}
