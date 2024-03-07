import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "forum page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Forum_View() {
  return (
    <div className="text-4xl text-green-600">
      <h1>Forum page</h1>
    </div>
  );
}
