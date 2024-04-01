import type { LoaderFunctionArgs } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   let sq = new URL(request.url).searchParams.get("sq");
//   console.log("🚀 ~ action ~ sq:", sq);
//   return { sq };
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let sq = new URL(request.url);
  let q = sq.searchParams.get("sq");
  console.log("🚀 ~ loader ~ q:", q);
  if (q !== null || q !== undefined) {
    const p = await db.post.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: q!,
        },
      },
    });

    return { p };
  }
};
