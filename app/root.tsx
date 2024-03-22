import { cssBundleHref } from "@remix-run/css-bundle";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Params,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
  useRouteError,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import Nav from "./components/Nav";
import { Button } from "./components/ui/button";
import { match } from "assert";
import { authenticator } from "./utils/auth.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/admin" });
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-red-500 text-center text-9xl text-white">
        <h1>ERROR</h1>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {location.pathname === "/" && <Nav></Nav>}
        {location.pathname === "/blog" && <Nav></Nav>}
        {location.pathname === "/forum" && <Nav></Nav>}
        {location.pathname === "/author" && <Nav></Nav>}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
