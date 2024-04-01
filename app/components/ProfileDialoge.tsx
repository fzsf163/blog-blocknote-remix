import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useFetcher } from "@remix-run/react";
import ToolTip_Box from "./tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function Profile_Dialoge() {
  const [edit, setEdit] = useState(false);
  const fetcher = useFetcher();
  return (
    <div>
      <Dialog open={edit} onOpenChange={setEdit}>
        <TooltipProvider>
          <Tooltip delayDuration={10}>
            <DialogTrigger>
              <TooltipTrigger asChild>
                <Edit className="text-blue-400"></Edit>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <fetcher.Form method="POST" encType="multipart/form-data">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit your Profile Here</DialogTitle>
              <DialogDescription> </DialogDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    // defaultValue="Pedro Duarte"
                    placeholder="Update Your name"
                    className="col-span-3"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="emailProfile"
                    // defaultValue="@peduarte"
                    placeholder="Update Your email"
                    className="col-span-3"
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="passwordProfile"
                    // defaultValue="@peduarte"
                    placeholder="Enter new password"
                    className="col-span-3"
                    type="password"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bioAuthor" className="text-right">
                    Bio
                  </Label>
                  {/* <Input
                    id="passwordProfile"
                    // defaultValue="@peduarte"
                    placeholder="Update Short Bio"
                    className="col-span-3"
                    type="text"
                  /> */}
                  <Textarea
                    id="authorBio"
                    placeholder="Update Your Short Bio"
                    className="col-span-3"
                  ></Textarea>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-start md:justify-end">
              <Button
                type="submit"
                variant={"secondary"}
                className="bg-green-300"
              >
                Update
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </fetcher.Form>
      </Dialog>
    </div>
  );
}
