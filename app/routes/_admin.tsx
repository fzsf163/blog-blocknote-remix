import type { LinksFunction } from "@remix-run/node";
import {
  Form,
  MetaFunction,
  NavLink,
  Outlet,
  useFetcher,
} from "@remix-run/react";

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
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  const [parent] = useAutoAnimate();
  // useEffect(() => {}, [show]);
  return (
    <div className=" flex h-[100dvh] items-start justify-start bg-slate-300">
      <aside
        className="  flex h-full w-[85px] flex-col items-center justify-start gap-4 bg-zinc-200 px-2 pt-10 transition-all duration-300 ease-in-out hover:w-[280px] "
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        // ref={parent}
        style={{
          transition: "all",
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        {admin_routes.map((ar) => {
          return (
            <NavLink key={ar.label + ar.href} to={ar.href} className={""}>
              {({ isActive, isPending, isTransitioning }) => (
                <Button
                  variant={"outline"}
                  style={{
                    transition: "all",
                    transitionDuration: "10ms",
                    transitionTimingFunction: "ease-in-out",
                  }}
                  className={
                    isTransitioning
                      ? "bg-green-400"
                      : isPending
                        ? "bg-blue-400"
                        : isActive
                          ? "w-fit border-none bg-slate-400   font-bold text-white hover:bg-green-700    hover:text-white "
                          : "w-fit border-black bg-transparent text-black/50  hover:border-none hover:bg-green-700 hover:font-semibold  hover:text-white"
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
                      className={show ? "w-[100px] opacity-100" : "w-0 opacity-0 overflow-hidden"}
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
        <header className="flex h-[5rem] w-[70%] items-center justify-between  px-5">
          <h1 className=" w-fit bg-gradient-to-r from-pink-600 via-yellow-600 to-blue-700 bg-clip-text p-3 text-xl font-extrabold text-transparent">
            Super Blog Admin Panel
          </h1>

          <Dialuge></Dialuge>

          <div className="flex items-center justify-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Form method="POST" navigate={false}>
              <Hover_Box></Hover_Box>
            </Form>
          </div>
        </header>
        <ScrollArea className="h-[90dvh] w-full px-10 py-5" type="scroll">
          <Outlet></Outlet>
        </ScrollArea>
      </div>
    </div>
  );
}
