import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { requireUserSession } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  return { userActionCenter: "ok" };
};
export default function Action_Center() {
  return (
    <div>
      This is Action Center
      <div>
        <h1>Slider</h1>
        <h1>Featured post</h1>
        <h1>Trending post</h1>
        <h1>Comments</h1>
        <h1>Author Page</h1>
      </div>
    </div>
  );
}
