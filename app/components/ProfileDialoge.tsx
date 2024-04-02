import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {  useFetcher } from "@remix-run/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type Profile_Data = {
  name?: string;
  email?: string;
  bio?: string;
  password?: string;
};
type ID = { id: string };
export default function Profile_Dialoge({ id }: ID) {
  const [edit, setEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState<Profile_Data>();
  const fetcher = useFetcher();
  const state = fetcher.state;
  useEffect(() => {
    if (fetcher.data) {
      //@ts-ignore
      if (fetcher.data?.status === "Success") {
        setProfileInfo({});
        setEdit(false);
      }
    }
  }, [fetcher.data]);
  return (
    <div>
      <fetcher.Form>
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

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit your Profile Here</DialogTitle>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="nameProfile"
                    // defaultValue="Pedro Duarte"
                    placeholder="Update Your name"
                    className="col-span-3"
                    type="text"
                    value={profileInfo?.name}
                    onChange={(x) =>
                      setProfileInfo({
                        ...profileInfo,
                        name: x.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="emailProfile" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="emailProfile"
                    name="emailProfile"
                    // defaultValue="@peduarte"
                    placeholder="Update Your email"
                    className="col-span-3"
                    type="email"
                    value={profileInfo?.email}
                    onChange={(x) =>
                      setProfileInfo({
                        ...profileInfo,
                        email: x.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="passwordProfile"
                    name="passwordProfile"
                    // defaultValue="@peduarte"
                    placeholder="Enter new password"
                    className="col-span-3"
                    type="password"
                    value={profileInfo?.password}
                    onChange={(x) =>
                      setProfileInfo({
                        ...profileInfo,
                        password: x.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="authorBio" className="text-right">
                    Bio
                  </Label>
                  <Textarea
                    id="authorBio"
                    name="authorBio"
                    placeholder="Update Your Short Bio"
                    className="col-span-3"
                    value={profileInfo?.bio}
                    onChange={(x) =>
                      setProfileInfo({
                        ...profileInfo,
                        bio: x.currentTarget.value,
                      })
                    }
                  ></Textarea>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-start md:justify-end">
              <Button
                type="submit"
                variant={"secondary"}
                className="bg-green-300"
                onClick={() =>
                  fetcher.submit(
                    { ...profileInfo, id: id },
                    {
                      method: "POST",
                      encType: "application/json",
                      action: "/api/profileUpdate",
                    },
                  )
                }
                disabled={state === "submitting" ? true : false}
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
        </Dialog>
      </fetcher.Form>
    </div>
  );
}
