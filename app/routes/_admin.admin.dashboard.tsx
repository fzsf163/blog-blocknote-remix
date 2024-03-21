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
} from "recharts";
import { ClientOnly } from "remix-utils/client-only";
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

  return u;
};

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/admin" });
}
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
  const u = useLoaderData<typeof loader>();
  let data = [
    { name: "Total Readers", value: 23, fill: "#57c0E6" },
    { name: "Total Read Counts", value: 40, fill: "#FF6565" },
    { name: "Total Vistis", value: 50, fill: "#FFDA83" },
    { name: "Total Stay Time(in mintues)", value: 400, fill: "purple" },
  ];
  let blogView = [
    { name: "Blog1", views: 72 },
    { name: "Blog2", views: 27 },
    { name: "Blog3", views: 88 },
    { name: "Blog4", views: 23 },
    { name: "Blog6", views: 35 },
    { name: "Blog7", views: 18 },
    { name: "Blog8", views: 58 },
    { name: "Blog9", views: 81 },
    { name: "Blog10", views: 34 },
    { name: "Blog11", views: 37 },
  ];
  return (
    <div className="w-[1500px] px-2 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold capitalize">
          Admin Dashborad page , Welcome{" "}
          <span className="bg-gradient-to-r from-green-900 via-yellow-900 to-fuchsia-900 bg-clip-text text-transparent">
            {" "}
            {u?.name}
          </span>
        </h1>
        {/* <h4 className="font-mono text-lg font-semibold">
          To logout click here
        </h4> */}
        <Form method="POST">
          <Button
            size={"icon"}
            type="submit"
            className="font-bold hover:bg-red-400 "
          >
            <Power></Power>
          </Button>
        </Form>
      </div>
      {/* charts begin  here */}
      <ClientOnly>
        {() => (
          <div className="flex items-center justify-center mt-10">
            {/* pie chart */}
            <ResponsiveContainer>
              <div className="w-fit">
                <PieChart width={730} height={550}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#00000"
                    label={renderCustomizedLabel}
                    legendType="circle"
                    blendStroke
                    cursor={"pointer"}
                    paddingAngle={2}
                  ></Pie>
                  <Tooltip
                    contentStyle={{
                      background: "transparent",
                      border: "none",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    itemStyle={{
                      color: "white",
                      backgroundColor: "gray",
                      borderRadius: "300px",
                      padding: "10px 16px",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    useTranslate3d
                  ></Tooltip>
                  <Legend
                    iconSize={20}
                    wrapperStyle={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                    verticalAlign="top"
                  ></Legend>
                </PieChart>
              </div>
            </ResponsiveContainer>
            <br />
            {/* line chart */}
            <ResponsiveContainer>
              <div className="w-fit">
                <LineChart
                  width={730}
                  height={550}
                  data={blogView}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" className="font-semibold" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      background: "transparent",
                      border: "none",
                      color: "whitesmoke",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    itemStyle={{
                      color: "white",
                      backgroundColor: "gray",
                      borderRadius: "300px",
                      padding: "10px 20px",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    useTranslate3d
                  />
                  <Legend
                    iconSize={20}
                    wrapperStyle={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                    verticalAlign="top"
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#82349d"
                    strokeWidth={5}
                  />
                </LineChart>
              </div>
            </ResponsiveContainer>
          </div>
        )}
      </ClientOnly>
    </div>
  );
}
