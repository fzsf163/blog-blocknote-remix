import type { LinksFunction } from "@remix-run/node";
// app/routes/login.tsx
import { Label } from "@radix-ui/react-dropdown-menu";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import Login_Reg_Form from "~/components/loginForm";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authenticator } from "~/utils/auth.server";
import { requireUserSession, sessionStorage } from "~/utils/session.server";
import { cssBundleHref } from "@remix-run/css-bundle";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Login_Admin() {
  const er = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto h-[100dvh]  bg-[url('/assests/log-bg.jpg')] bg-cover bg-no-repeat text-white">
      <em className="p-5 text-center font-mono text-xl text-black">
        {" "}
        {er ? <p>{er?.error?.message}</p> : null}
      </em>
      <Form
        method="POST"
        className="relative top-[25%] mx-auto flex w-fit flex-col items-center justify-center gap-5 rounded   p-10"
      >
        <Login_Reg_Form></Login_Reg_Form>
      </Form>
    </div>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionFunctionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin",
  });
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderFunctionArgs) {
  // const session = await requireUserSession(request);
  // console.log("🚀 ~ loader ~ session2:", session2.get("userID"));
  // If the user is already authenticated redirect to /dashboard directly
  // await authenticator.isAuthenticated(request, {
  //   successRedirect: "/admin/dashboard",
  // });
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const error = session.get("sessionErrorKey");
  return json<any>(error ? { error } : { OK: "ok" });
}
