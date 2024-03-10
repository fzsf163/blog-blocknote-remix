import type { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import EditorBlockNote from "~/components/blockNote.client";
import { db } from "~/utils/db.server";
import { requireUserSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "admin/posts page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);
  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/admin",
  // });
  let id = params?.id;
  console.log("🚀 ~ loader ~ id:", id);
  try {
    let post = await db.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {}
  return { post: "None Found" };
};

export default function Admin_Posts_Edit_One() {
  const post = useLoaderData<typeof loader>();
  let p: string | undefined;
  if (typeof post === "object") {
    // @ts-ignore
    p = post?.content;
  }
  const [data, setData] = useState<string>("");
  console.log("🚀 ~ Admin_Posts_Edit_One ~ post:", p);

  return (
    <div className="font-mono text-4xl">
      <h1 className="mb-2"> Edit a Post</h1>
      <hr />
      <div className="mt-10">
        <ClientOnly fallback={<p>Loading....</p>}>
          {() => (
            <EditorBlockNote
              key={"edit-post-one"}
              data={p}
              setData={setData}
            ></EditorBlockNote>
          )}
        </ClientOnly>
      </div>
    </div>
  );
}
