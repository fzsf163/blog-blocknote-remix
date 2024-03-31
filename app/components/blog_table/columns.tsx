import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Trash, Edit2 } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Blog_Posts = {
  id: string;
  title: string;
  author: string;
  status: "Visible" | "Hidden";
  read: number;
  published: string;
  actions?: Function;
  readTime?: string;
};
type ID = {
  id: string;
};
export function PopDelete({ id }: ID) {
  const [isOpen, setIsOpen] = useState(false);
  const submit = useSubmit();
  const fetcher = useFetcher();
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Trash></Trash>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col items-center gap-5 border-none bg-red-400 text-white ring-0 [&_button]:border-none">
        <p className="font-serif font-semibold">
          {" "}
          Do you really want to delete this post?{" "}
        </p>
        <div className=" flex items-center justify-center gap-8">
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-red-500 text-white hover:bg-green-600 hover:text-white"
            onClick={() => {
              fetcher.submit(
                { id },
                {
                  action: "/admin/posts",
                  encType: "application/json",
                  method: "DELETE",
                },
              );
              setIsOpen(false);
            }}
          >
            YES
          </Button>
          <Button
            variant={"outline"}
            size={"lg"}
            className=" w-full text-black hover:bg-green-600 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            NO
          </Button>{" "}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const columns: ColumnDef<Blog_Posts>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       className="bg-blue-400 "
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
          className="text-white"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const a = row.original;

      return (
        <Button variant={"link"} className="text-white">
          <Link to={`/admin/posts/show/${a.id}`}>{a.title}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white"
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white"
        >
          Status/Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "read",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white"
        >
          Read Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "published",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("published");
      // const formatted = new Intl.DateTimeFormat("en", {
      //   dateStyle: "full",
      //   timeStyle: "short",
      //   // timeZone: "BST",
      // }).format(date);

      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "actions",
    id: "Actions",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="text-white">
          Action
        </Button>
      );
    },
    cell: ({ row }) => {
      const a = row.original;

      return (
        <div>
          <ClientOnly>{() => <PopDelete id={a.id}></PopDelete>}</ClientOnly>

          <Button variant={"ghost"} size={"icon"}>
            <Link to={`/admin/posts/edit/${a.id}`}>
              <Edit2></Edit2>
            </Link>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "readTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white"
        >
          Read Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const readTime: string = row.getValue("readTime");
      return <p className="">{readTime}</p>;
    },
  },
];
