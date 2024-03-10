import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Trash, Edit2 } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { Link } from "@remix-run/react";
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
          Status
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
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("published");
      //   const formatted = new Intl.DateTimeFormat("en", {
      //     dateStyle: "full",
      //     timeStyle: "short",
      //     // timeZone: "BST",
      //   }).format(date);

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
          <Button variant={"ghost"} size={"icon"}>
            <Trash></Trash>
          </Button>
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
