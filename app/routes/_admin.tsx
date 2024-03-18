import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  NavLink,
  Outlet,
  redirect,
  useMatches,
} from "@remix-run/react";
import { json } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { authenticator } from "~/utils/auth.server";
import { cssBundleHref } from "@remix-run/css-bundle";

export const meta: MetaFunction = () => {
  return [
    { title: "admin page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
type HandleType = {
  breadcrumb: (param?: string) => React.ReactNode;
};
const admin_routes = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Posts", href: "/admin/posts" },
  { label: "Profile", href: "/admin/profile" },
  { label: "Action Center", href: "/admin/actioncenter" },
];

export default function Admin_Layout() {
  return (
    <div className="h-full">
      <header className="flex h-[5rem] w-full items-center justify-between bg-slate-600 px-5">
        <h1 className=" w-fit bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text p-3 text-4xl font-extrabold text-transparent">
          Super Blog Admin Panel
        </h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <div className="flex h-full items-start justify-start bg-slate-400">
        <aside className="sticky flex h-[100dvh] w-[280px] flex-col items-start justify-start gap-4 bg-slate-500 px-5 pt-5">
          {admin_routes.map((ar) => {
            return (
              <NavLink
                key={ar.label}
                to={ar.href}
                className={"text-xl text-white"}
              >
                {({ isActive, isPending }) => (
                  <Button
                    variant={"outline"}
                    className={
                      isPending
                        ? "bg-blue-400"
                        : isActive
                          ? "w-[200px] border-none bg-slate-600 text-xl font-bold text-white hover:bg-green-600 hover:text-white"
                          : "w-[200px] border-black bg-transparent text-white hover:border-none hover:bg-green-600 hover:font-semibold hover:text-white"
                    }
                  >
                    {ar.label}
                  </Button>
                )}
              </NavLink>
            );
          })}
        </aside>

        {/* <div className="flex w-full items-start justify-start gap-4 bg-green-800 p-2">
          <ol className="flex items-start justify-start gap-2 divide-x-2 text-lg ">
            {matches
              .filter(
                (match) =>
                  (match.handle as HandleType) &&
                  (match.handle as HandleType).breadcrumb,
              )
              .map((match, index) => (
                <li key={index}>
                  <Button
                    variant={"outline"}
                    className="w-fit text-black"
                    size={"lg"}
                  >
                    {(match.handle as HandleType).breadcrumb(
                      match.data as string | undefined,
                    )}
                  </Button>
                </li>
              ))}
          </ol>
          <ol className="flex items-start justify-start gap-2 text-lg ">
            <NavLink to={"/admin/posts/edit/:id"}>
              <Button variant={"outline"}>Edit One</Button>
            </NavLink>
            <NavLink to={"/admin/posts/show/:id"}>
              <Button variant={"outline"}>Show One</Button>
            </NavLink>
            <NavLink to={"/admin/posts/create"}>
              <Button variant={"outline"}>Create Post</Button>
            </NavLink>
          </ol>
        </div> */}

        <ScrollArea className="mx-auto">
          <Outlet></Outlet>
        </ScrollArea>
      </div>
    </div>
  );
}
