import type { LinksFunction } from "@remix-run/node";
import { Form, MetaFunction, NavLink, Outlet } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { cssBundleHref } from "@remix-run/css-bundle";

import Hover_Box from "~/components/hoverCard";
import Dialuge from "~/components/dialouge";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  SquareGantt,
  UserCog,
  LocateFixed,
} from "lucide-react";

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
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard></LayoutDashboard>,
  },
  { label: "Posts", href: "/admin/posts", icon: <SquareGantt></SquareGantt> },
  { label: "Profile", href: "/admin/profile", icon: <UserCog></UserCog> },
  {
    label: "Action Center",
    href: "/admin/actioncenter",
    icon: <LocateFixed></LocateFixed>,
  },
];

export default function Admin_Layout() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className=" flex h-[100dvh] items-start justify-start bg-slate-300">
      <aside
        className="hidden h-full  w-[85px] flex-col items-center justify-start gap-4 bg-zinc-200 px-2 pt-10 transition-all duration-150 ease-in-out hover:w-[280px] sm:hidden md:hidden lg:flex"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          transition: "all",
          transitionDuration: "0.2s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        {admin_routes.map((ar) => {
          return (
            <NavLink key={ar.label + ar.href} to={ar.href} className={""}>
              {({ isActive, isPending, isTransitioning }) => (
                <Button
                  variant={"outline"}
                  className={
                    isPending
                      ? "bg-blue-400"
                      : isActive
                        ? "w-fit bg-slate-400 font-bold text-white hover:bg-green-500  hover:text-white"
                        : "w-fit border-black bg-transparent font-semibold  text-black/50 hover:bg-green-400"
                  }
                >
                  <div className="flex items-center justify-between gap-3 ">
                    <span className="w-[8px]">{ar.icon}</span>
                    <span
                      style={{
                        transition: "all",
                        transitionDuration: "0.3s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                      className={
                        show
                          ? "w-[100px] opacity-100"
                          : "w-0 overflow-hidden opacity-0"
                      }
                    >
                      {ar.label}
                    </span>
                  </div>
                </Button>
              )}
            </NavLink>
          );
        })}
      </aside>
      <div className=" flex w-full flex-col  items-center justify-center">
        <header className="hidden h-[5rem] w-[70%] items-center justify-between px-5 sm:hidden md:hidden lg:flex">
          <h1 className=" w-fit bg-gradient-to-r from-pink-600 via-yellow-600 to-blue-700 bg-clip-text p-3 text-xl font-extrabold text-transparent">
            Super Blog Admin Panel
          </h1>

          <Dialuge></Dialuge>

          <div className="sm:hidden md:hidden lg:flex lg:items-center lg:justify-center lg:gap-4 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Form method="POST" navigate={false}>
              <Hover_Box></Hover_Box>
            </Form>
          </div>
        </header>
        <ScrollArea
          className="h-[98dvh] w-full px-10 py-5 sm:h-[99svh] md:h-[98svh] lg:h-[90svh]"
          type="scroll"
        >
          <Outlet></Outlet>
        </ScrollArea>
      </div>
    </div>
  );
}
