import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/utils/auth.server";
import { requireUserSession } from "~/utils/session.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { db } from "~/utils/db.server";
import { Cross, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import React, { forwardRef } from "react";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import SearchBOX from "~/components/searchbox";

const HoverComponent = forwardRef(function HoverComponent(
  props: { HoverSub: React.ReactNode; HoverTEXT: string },
  ref: React.LegacyRef<HTMLDivElement> | undefined,
) {
  const { HoverSub, HoverTEXT } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={10}>
        <TooltipTrigger>{HoverSub}</TooltipTrigger>
        <TooltipContent ref={ref!}>
          <p>{HoverTEXT}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  const userID = session?.data?.sessionKey?.userID;

  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  const posts = await db.post.findMany({
    where: {
      published: true,
    },
  });
  const comments = await db.comments.findMany();
  const slider = await db.slider.findMany();
  const featured = await db.featuredBlogs.findMany();
  const authorPage = await db.user.findFirst({
    where: {
      id: userID,
    },
    select: {
      authorPage: true,
    },
  });

  const requestedTopics = await db.requestedTopics.findMany();

  return {
    data: { posts, comments, slider, featured, authorPage, requestedTopics },
  };
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
  const loaderData = useLoaderData<typeof loader>();
  console.log("🚀 ~ FancyButton ~ loaderData:", loaderData);
  return (
    <div className="py-3 inter-font-400">
      <p className="text-sm">
        Welcome to{" "}
        <span className="cursor-pointer rounded-full bg-black/80  px-6 py-2 font-sans font-semibold not-italic text-white underline underline-offset-2 drop-shadow-lg">
          Action Center
        </span>
      </p>
      <Tabs defaultValue="slider" className="mt-10 min-w-full">
        <TabsList className="h-auto w-full bg-black/80 p-4 text-white ">
          <TabsTrigger
            value="slider"
            className="m:text-sm rounded-full px-6 py-2  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Slider
          </TabsTrigger>
          <TabsTrigger
            value="featured"
            className="m:text-sm rounded-full px-6 py-2  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="m:text-sm rounded-full px-6 py-2  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="m:text-sm rounded-full px-6 py-2  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Comments
          </TabsTrigger>
          <TabsTrigger
            value="author"
            className="m:text-sm rounded-full px-6 py-2  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Author
          </TabsTrigger>
          <TabsTrigger
            value="reqTopic"
            className="m:text-sm rounded-full px-6 py-2  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            Requested Topics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="slider">
          {/* this is the add button */}
          <div className="flex items-center justify-start gap-3">
            <div>
              <h1 className=" text-lg font-semibold text-[#7c656a]">
                Add to Slider
              </h1>
            </div>
            <ClientOnly>
              {() => (
                <Sheet>
                  <SheetTrigger asChild>
                    <HoverComponent
                      HoverSub={<Cross></Cross>}
                      HoverTEXT="Add to Slider"
                    ></HoverComponent>
                  </SheetTrigger>
                  <SheetContent side={"top"}>
                    <SheetHeader>
                      <SheetTitle>Are you absolutely sure?</SheetTitle>
                      <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              )}
            </ClientOnly>
          </div>

          <div className="m-10 h-[254px] w-[190px] rounded-[30px] bg-[#e0e0e0] shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff]"></div>
        </TabsContent>
        <TabsContent value="featured">Feature the GOATS</TabsContent>
        <TabsContent value="trending">Go somethign trendy.</TabsContent>
        <TabsContent value="comments">JUST CHILL COMMENTS</TabsContent>
        <TabsContent value="author">
          {" "}
          Once More BlockNote.Full View MOOD GOOOOO!!!
        </TabsContent>
        <TabsContent value="reqTopic">GET THE TOPICS</TabsContent>
      </Tabs>
    </div>
  );
}
