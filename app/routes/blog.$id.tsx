import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return { null: "ok" };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return { null: "ok" };
};

export default function Blog_Single() {
  return <div />;
}
