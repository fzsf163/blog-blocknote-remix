import type { LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import { Power } from "lucide-react";
import {
  destroySession,
  getSession,
  requireUserSession,
  sessionStorage,
} from "~/utils/session.server";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Tooltip,
  PolarGrid,
  Cell,
  XAxis,
  CartesianGrid,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { ClientOnly } from "remix-utils/client-only";
import Stat_Box from "~/components/statBox";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";
import Blog_Card from "~/components/blogcard";
import { ScrollArea } from "~/components/ui/scroll-area";
import Clock from "react-live-clock";
export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const handle = {
  breadcrumb: () => <Link to="/admin/dashboard">Dashboard</Link>,
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // get the user data or redirect to /login if it failed
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });

  // if the user is authenticated, redirect to /dashboard
  // await authenticator.isAuthenticated(request, {
  //   successRedirect: "/admin/dashboard",
  // });
  // const session = await getSession(
  //   request.headers.get("Cookie"),
  // );
  const user = session.data?.sessionKey?.userID;

  const u = await db.user.findUnique({
    where: {
      id: user,
    },
    select: {
      email: true,
      name: true,
      posts: true,
      bio: true,
    },
  });

  const p = await db.post.findMany({
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
    select: {
      title: true,
      createdAt: true,
    },
  });

  const c_c = await db.comments.count();
  const c_s = await db.subscribers.count();
  const c_p = await db.post.count();

  return { u, p, c_c, c_s, c_p };
};

// export async function action({ request }: ActionFunctionArgs) {
//   await authenticator.logout(request, { redirectTo: "/admin" });
// }
//  crazy fucntions incoming
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  //@ts-ignore
  cx,
  //@ts-ignore
  cy,
  //@ts-ignore
  midAngle,
  //@ts-ignore
  innerRadius,
  //@ts-ignore
  outerRadius,
  //@ts-ignore
  percent,
  //@ts-ignore
  index,
  //@ts-ignore
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-2xl font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Admin_Posts() {
  const { u, p, c_c, c_s, c_p } = useLoaderData<typeof loader>();

  const [parent] = useAutoAnimate(/* optional config */);
  let data = [
    { name: "Total Readers", value: 23, fill: "#57c0E6" },
    { name: "Total Read Counts", value: 40, fill: "#FF6565" },
    { name: "Total Vistis", value: 50, fill: "#FFDA83" },
    { name: "Total Stay Time(in mintues)", value: 400, fill: "purple" },
  ];
  let blogView = [
    { name: "Blog2", views: 27, comments: 505 },
    { name: "Blog1", views: 72, comments: 214 },
    { name: "Blog3", views: 88, comments: 565 },
    { name: "Blog4", views: 23, comments: 843 },
    { name: "Blog6", views: 35, comments: 873 },
    { name: "Blog7", views: 18, comments: 143 },
    { name: "Blog8", views: 58, comments: 914 },
    { name: "Blog9", views: 81, comments: 317 },
    { name: "Blog10", views: 34, comments: 193 },
    { name: "Blog11", views: 37, comments: 291 },
  ];
  return (
    <div className="w-[1500px] px-2 py-3">
      <div className="m-5 flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">
          Welcome to Dashborad
          <span className="bg-gradient-to-r from-green-900 via-yellow-900 to-fuchsia-900 bg-clip-text text-transparent">
            {" "}
            {u?.name}
          </span>
        </h1>
        <Clock
          format={"dddd, MMMM Do YYYY, h:mm:ss a"}
          ticking={true}
          className="text-lg font-bold"
          noSsr
          // blinking={"all"}
          // timezone={"Asia/Dacca"}
        />
      </div>
      {/* card boxes for stat */}
      <div ref={parent} className="grid grid-cols-2 gap-5">
        <Stat_Box
          key={"subss"}
          count={c_s}
          emoji="💖"
          title_text="Subscribers"
        ></Stat_Box>
        <Stat_Box
          key={"readeerrs"}
          count={3000}
          emoji="😘"
          title_text="Readers"
        ></Stat_Box>
        <Stat_Box
          key={"blogsss"}
          count={c_p}
          emoji="🌸"
          title_text="Blogs"
        ></Stat_Box>
        <Stat_Box
          key={"pageeeess"}
          count={c_p}
          emoji="🥲"
          title_text="Pages"
        ></Stat_Box>
        <Stat_Box
          key={"comeeenasnashj"}
          count={c_c}
          emoji="📖"
          title_text="Comments"
        ></Stat_Box>
        {/* <Stat_Box
          key={"carageggeeg"}
          count={100}
          emoji="🎃"
          title_text="Categories"
        ></Stat_Box> */}
        {/* <Stat_Box
          key={"keyeiwowods"}
          count={500}
          emoji="🔑"
          title_text="Keywords"
        ></Stat_Box> */}
      </div>
      <br />
      <br />
      {/* charts begin  here */}
      <div className="flex items-center justify-start gap-6">
        <ClientOnly>
          {() => (
            <AreaChart
              width={730}
              height={450}
              data={blogView}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9894e8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="comments"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          )}
        </ClientOnly>
        <div className="w-[600px] bg-black/5">
          <div className="h-[70px]  rounded bg-black/60">
            <h1 className="p-4 font-mono text-3xl font-bold text-white">
              Recent Blogs
            </h1>
          </div>
          <div className="px-3 py-2">
            <ScrollArea className="h-[500px]">
              {p.map((x) => {
                return (
                  <Blog_Card
                    name={x.title}
                    time={x.createdAt}
                    key={x.title + x.createdAt}
                  ></Blog_Card>
                );
              })}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
