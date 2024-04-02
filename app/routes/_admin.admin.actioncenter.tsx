import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/utils/auth.server";
import { requireUserSession } from "~/utils/session.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  return { userActionCenter: "ok" };
};
type ParamForButton = {
  text: string;
};

const FancyButton = ({ text }: ParamForButton) => {
  return (
    <div className="z-100 group relative cursor-pointer overflow-hidden rounded-full border border-green-800 px-8 py-2 font-semibold">
      <span className="relative z-10 text-xl text-green-900 duration-500 group-hover:text-white">
        {text}
      </span>
      <span className="absolute -left-32 top-0 h-full w-full -rotate-45 bg-green-700 duration-500 group-hover:left-0 group-hover:rotate-0"></span>
      <span className="absolute -right-32 top-0 h-full w-full -rotate-45 bg-green-700 duration-500 group-hover:right-0 group-hover:rotate-0"></span>
    </div>
  );
};
export default function Action_Center() {
  return (
    <div className="py-3">
      <p className="text-sm italic">
        Welcome to{" "}
        <span className="rounded-full bg-green-800 px-4  py-3 font-mono text-white underline underline-offset-8">
          Action Center
        </span>
      </p>
      {/* <div
        ref={parent}
        className="mt-10 flex items-center justify-center gap-10"
      >
        <FancyButton text="Slider"></FancyButton>
        <FancyButton text="Featured"></FancyButton>
        <FancyButton text="Trending"></FancyButton>
        <FancyButton text="Comments"></FancyButton>
        <FancyButton text="Author"></FancyButton>
      </div> */}
      <Tabs defaultValue="slider" className="mt-10 min-w-full">
        <TabsList className="h-auto w-full bg-slate-500 p-4 text-white ">
          <TabsTrigger
            value="slider"
            className="rounded-full px-6 py-2 m:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Slider
          </TabsTrigger>
          <TabsTrigger
            value="featured"
            className="rounded-full px-6 py-2 m:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="rounded-full px-6 py-2 m:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="rounded-full px-6 py-2 m:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Comments
          </TabsTrigger>
          <TabsTrigger
            value="author"
            className="rounded-full px-6 py-2 m:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Author
          </TabsTrigger>
        </TabsList>
        <TabsContent value="slider">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="featured">Change your password here.</TabsContent>
        <TabsContent value="trending">Change your password here.</TabsContent>
        <TabsContent value="comments">Change your password here.</TabsContent>
        <TabsContent value="author">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
