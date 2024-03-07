import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "author page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Author_View() {
  return (
    <div className="text-4xl text-green-600">
      <h1>Author page</h1>
    </div>
  );
}
