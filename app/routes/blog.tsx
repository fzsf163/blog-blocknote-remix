import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "blog page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Blog_View() {
  return (
    <div className="text-4xl text-green-600">
      <h1>Blog page</h1>
    </div>
  );
}
