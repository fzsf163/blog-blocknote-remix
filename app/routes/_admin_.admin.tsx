// app/routes/login.tsx
import { Label } from "@radix-ui/react-dropdown-menu";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authenticator } from "~/utils/auth.server";
import { requireUserSession, sessionStorage } from "~/utils/session.server";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Login_Admin() {
  const er = useLoaderData<typeof loader>();
  console.log("🚀 ~ Login_Admin ~ er:", er);
  return (
    <div className="mx-auto h-[100dvh] bg-black/80 text-white">
      <Form
        method="POST"
        className="relative top-[25%] mx-auto flex w-fit flex-col items-center justify-center gap-5 rounded border border-blue-300 p-10"
      >
        <div>
          <Label className="text-lg font-bold">Email</Label>
          <Input
            type="email"
            className="w-[20rem] bg-black/30"
            required
            name="email"
          ></Input>
        </div>
        <div>
          <Label className="text-lg font-bold">Password</Label>
          <Input
            type="password"
            className="w-[20rem] bg-black/30"
            name="password"
            required
          ></Input>
        </div>
        <Button type="submit" className="w-[20rem]">
          Sign In
        </Button>
        {er ? <p>{er?.error?.message}</p> : null}
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
  const session = await requireUserSession(request);
  // console.log("🚀 ~ loader ~ session2:", session2.get("userID"));
  // If the user is already authenticated redirect to /dashboard directly
  // await authenticator.isAuthenticated(request, {
  //   successRedirect: "/admin/dashboard",
  // });
  // const session = await sessionStorage.getSession(
  //   request.headers.get("Cookie"),
  // );

  const error = session.get("sessionErrorKey");
  return json<any>(error ? { error } : { OK: "ok" });
}
