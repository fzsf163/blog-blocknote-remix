import { MetaFunction } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "author page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Author_View() {
  const [data, setData] = useState<string>("");
  return (
    <div className="text-4xl text-green-600">
      <h1>Author page</h1>
    </div>
  );
}
