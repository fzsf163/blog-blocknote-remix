import type { ActionFunctionArgs } from "@remix-run/node";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Edit, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  let userid = session.data?.sessionKey?.userID;
  // return json({ login: session });
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  const u = await db.user.findUnique({
    where: {
      id: userid,
    },
  });
  return u;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await request.json();
  try {
    await db.user.update({
      data: {
        image: user?.imageForProfile,
      },
      where: {
        id: user?.id,
      },
    });
  } catch (error) {}
  return { status: "Ok" };
};

type user = {
  id: string;
  email: string;
  password: string;
  name: string | null;
  image: string | null;
  bio: string | null;
};
export default function Admin_Profile() {
  const data = useLoaderData<typeof loader>();
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const fetcher = useFetcher();
  //@ts-ignore
  const imgUrl = fetcher.data?.file?.url;
  // console.log("🚀 ~ Admin_Profile ~ fetcher:", fetcher.data?.file?.url);
  const [parent] = useAutoAnimate(/* optional config */);
  const { bio, email, id, image, name, password }: user = data!;
  useEffect(() => {
    if (imgUrl) {
      fetcher.submit(
        { imageForProfile: imgUrl, id: id },
        {
          method: "POST",
          encType: "application/json",
        },
      );
    }
  }, [imgUrl]);
  return (
    <div className="w-[1250px] px-3 py-5">
      <h1 className=" text-left font-mono text-xl font-bold">Profile </h1>
      <div className="flex flex-col items-start justify-center gap-4">
        <div
          className="relative h-[250px] w-full rounded border "
          ref={parent}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {image ? (
            <img
              src={image!}
              className="h-[250px]  lg:w-full rounded object-cover"
            ></img>
          ) : (
            <p className="h-full rounded bg-slate-600 pt-24 text-center font-mono font-bold text-white">
              No Image Found
            </p>
          )}
          {show && (
            <div className="absolute left-3 top-3 text-white">
              <label className="flex cursor-pointer items-center justify-center gap-3 rounded bg-slate-500 px-3 py-4">
                Upload Image
                <Image></Image>
                <input
                  type="file"
                  name="myImage"
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(x) => {
                    const formData = new FormData();
                    formData.append("image", x.currentTarget.files?.[0]!);
                    console.log(x.currentTarget?.files?.[0]);
                    fetcher.submit(formData, {
                      method: "POST",
                      encType: "multipart/form-data",
                      action: "/api/image",
                    });
                  }}
                />
              </label>
            </div>
          )}
        </div>
        <div className="space-y-3" ref={parent}>
          <div className="flex items-center justify-start gap-2">
            <h1 className="font-mono text-lg font-semibold">
              Personal Details
            </h1>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <Edit
                      className={
                        edit
                          ? "cursor-pointer text-blue-400"
                          : "cursor-pointer text-black"
                      }
                      onClick={() => setEdit(!edit)}
                    ></Edit>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <p className="font-serif text-sm italic">Name</p>
          <h1 className="text-3xl font-bold">{name ?? "Not found"}</h1>
          {edit && <Input type="text" placeholder="Update Name..."></Input>}
          <p className="font-serif text-sm italic">Email</p>
          <h2 className="text-xl font-bold">{email ?? "Not found"}</h2>
          {edit && <Input type="text" placeholder="Update Email..."></Input>}
          <p className="font-serif text-sm italic">Author ID</p>
          <h2 className="text-xl font-bold">{id ?? "Not found"}</h2>
          <p className="font-serif text-sm italic">Bio</p>
          <p className="text-xl font-bold">{bio ?? "Not found"}</p>
          {edit && <Textarea placeholder="Update Bio..."></Textarea>}
          {edit && (
            <div className="space-y-2">
              <Label htmlFor="passUp">Update Password</Label>
              <Input
                name="passUp"
                type="password"
                placeholder="Update Password..."
              ></Input>
            </div>
          )}
          {/* <p className="font-serif text-sm italic">Update Password</p>
          <p className="text-xl font-bold">{password ? "********":null}</p> */}
        </div>
      </div>
      {edit && (
        <div className="mt-5 space-x-3">
          <Button>Save</Button>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
        </div>
      )}
    </div>
  );
}
