import type { ActionFunctionArgs } from "@remix-run/node";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";

import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";
import Profile_Dialoge from "~/components/ProfileDialoge";
import { ClientOnly } from "remix-utils/client-only";

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
  if (user) {
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
  }
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
    <div className="w-[100%] px-3 py-5">
      <h1 className=" text-left font-mono text-xl font-bold">Profile </h1>
      <div className="flex flex-col items-start justify-center gap-4">
        <div
          className="relative h-[350px] w-full rounded border"
          ref={parent}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {image ? (
            <img
              src={image!}
              className="h-[350px]  w-full rounded object-cover "
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
                  accept="image/*"
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
        <div className="w-full space-y-3" ref={parent}>
          <div className="flex items-center justify-start gap-2">
            <h1 className="font-mono text-lg font-semibold">
              Personal Details
            </h1>
            <div>
              <ClientOnly fallback={<p>Loading...</p>}>
                {() => <Profile_Dialoge id={id}></Profile_Dialoge>}
              </ClientOnly>
            </div>
          </div>
          <div className=" [&_p]:text-md [&_p]:rounded-md [&_p]:p-3 [&_p]:font-serif [&_p]:font-light [&_p]:text-black [&_p]:underline [&_p]:underline-offset-4 ">
            <p>Bio</p>
            <h3 className="px-4 text-center text-xl font-medium">
              {bio ?? "Not found"}
            </h3>
            <p>Name</p>
            <h1 className="px-4 text-xl font-medium">{name ?? "Not found"}</h1>

            <p>Email</p>
            <h2 className="px-4 text-xl font-medium">{email ?? "Not found"}</h2>

            <p>Author ID</p>
            <h2 className="px-4 text-xl font-medium">{id ?? "Not found"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
