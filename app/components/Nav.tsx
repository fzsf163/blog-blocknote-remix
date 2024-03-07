import { NavLink } from "@remix-run/react";
import { Button } from "./ui/button";
import { Search, Star } from "lucide-react";

export default function Nav() {
  const navLinks = [
    { label: "Home", id: "home", href: "/" },
    { label: "Blog", id: "blog", href: "/blog" },
    { label: "Author", id: "author", href: "/author" },
    { label: "Forum", id: "forum", href: "/forum" },
  ];
  return (
    <nav className="bg-neutral-200 px-2 py-3 rounded text-2xl flex items-center justify-around">
      <h1 className="text-3xl font-bold flex items-center">
        Mind-Cavern <Star></Star>
      </h1>
      <div className="gap-4 flex items-center justify-between">
        {navLinks.map(nav => {
          return (
            <NavLink
              to={nav.href}
              key={nav.id}
              prefetch="intent"
            >
              {({ isActive, isPending }) => (
                <Button
                  variant={"link"}
                  className={
                    isPending
                      ? "bg-blue-400"
                      : isActive
                      ? "bg-neutral-500 text-white"
                      : "bg-transparent "
                  }
                >
                  {nav.label}
                </Button>
              )}
            </NavLink>
          );
        })}
        <div className="cursor-pointer">
          <Search></Search>
        </div>
      </div>
    </nav>
  );
}
