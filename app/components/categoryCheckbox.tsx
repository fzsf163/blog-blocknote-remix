"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];
type Values = {
  values: {
    v1: string;
    v2: string;
    v3: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      v1: string;
      v2: string;
      v3: string;
    }>
  >;
};
export function DropdownMenuCheckboxesCategory({ values, setValues }: Values) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  React.useEffect(() => {
    if (showStatusBar === false) {
      setValues({ ...values, v1: "" });
    }
  }, [showStatusBar]);
  React.useEffect(() => {
    if (showActivityBar === false) {
      setValues({ ...values, v2: "" });
    }
  }, [showActivityBar]);
  React.useEffect(() => {
    if (showPanel === false) {
      setValues({ ...values, v3: "" });
    }
  }, [showPanel]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" w-[10rem] text-black">
          Select
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>
          Select all categories that fit the blog
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
          onSelect={(e) => e.preventDefault()}
          onClick={(e) =>
            setValues({ ...values, v1: e.currentTarget.innerText })
          }
        >
          Spiritual
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          onSelect={(e) => e.preventDefault()}
          onClick={(e) =>
            setValues({ ...values, v2: e.currentTarget.innerText })
          }
        >
          Option 2
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
          onSelect={(e) => e.preventDefault()}
          onClick={(e) =>
            setValues({ ...values, v3: e.currentTarget.innerText })
          }
        >
          Option 3
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
