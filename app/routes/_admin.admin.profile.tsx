import type { ActionFunctionArgs } from "@remix-run/node";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ALargeSmall, Contact, Image, Mail, ScanEye } from "lucide-react";
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
    <div className="w-[100%] px-3 py-5 inter-font-400">
      <h1 className=" text-left text-xl font-bold">Profile </h1>
      <div className="flex flex-col items-start justify-center gap-10 md:flex-row">
        <div
          className="relative h-full w-full rounded border md:w-[40%] "
          ref={parent}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {image ? (
            <img src={image!} className="h-full  w-full rounded object-cover "></img>
          ) : (
            <p className="h-full rounded bg-slate-600 pt-24 text-center font-mono font-bold text-white">
              No Image Found
            </p>
          )}
          {show && (
            <div className="absolute left-3 top-3 text-white ">
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
            <h1 className=" text-lg font-semibold">
              Personal Details
            </h1>
            <div>
              <ClientOnly fallback={<p>Loading...</p>}>
                {() => <Profile_Dialoge id={id}></Profile_Dialoge>}
              </ClientOnly>
            </div>
          </div>
          <div className=" [&_p]:text-md  space-y-8 [&_p]:rounded-md [&_p]:p-3  [&_p]:font-bold [&_p]:underline [&_p]:underline-offset-4 ">
            <div className="flex flex-col items-start justify-start gap-3">
              <p className="flex w-fit items-center justify-start gap-2 bg-black/80 text-white shadow-md shadow-slate-600">
                <Contact className="text-green-500"></Contact> Bio
              </p>
              <h3 className="rounded bg-transparent/50  px-9  py-6 text-center   text-white shadow-md  shadow-slate-900 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {bio ?? "Not found"}
              </h3>
            </div>
            <div className="flex  flex-col items-start justify-start gap-3">
              <p className="flex w-fit items-center justify-start gap-2 bg-black/80 text-white shadow-md shadow-slate-600">
                <ALargeSmall className="text-green-500"></ALargeSmall> Name
              </p>
              <h1 className="bg-transparent/50  px-9  py-6 text-center   text-white shadow-md  shadow-slate-900 sm:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl">
                {name ?? "Not found"}
              </h1>
            </div>

            <div className="flex  flex-col items-start justify-start gap-3">
              <p className="flex w-fit items-center justify-start gap-2 bg-black/80 text-white shadow-md shadow-slate-600">
                {" "}
                <Mail className="text-green-500"></Mail> Email
              </p>
              <h2 className="bg-transparent/50  px-9  py-6 text-center   text-white shadow-md  shadow-slate-900 sm:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl">
                {email ?? "Not found"}
              </h2>
            </div>

            <div className="flex  flex-col items-start justify-start gap-3">
              <p className="flex w-fit items-center justify-start gap-2 bg-black/80 text-white shadow-md shadow-slate-600 ">
                {" "}
                <ScanEye className="text-green-500"></ScanEye> Author ID
              </p>
              <h2 className="bg-transparent/50  px-9  py-6 text-center   text-white shadow-md  shadow-slate-900 sm:text-sm  md:text-base  lg:text-lg xl:text-xl 2xl:text-2xl">
                {id ?? "Not found"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
