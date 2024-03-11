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
    c1: string;
    c2: string;
    c3: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      c1: string;
      c2: string;
      c3: string;
    }>
  >;
};
export function DropdownMenuCheckboxesCategory({ values, setValues }: Values) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  React.useEffect(() => {
    if (showStatusBar === false) {
      setValues({ ...values, c1: "" });
    }
  }, [showStatusBar]);
  React.useEffect(() => {
    if (showActivityBar === false) {
      setValues({ ...values, c2: "" });
    }
  }, [showActivityBar]);
  React.useEffect(() => {
    if (showPanel === false) {
      setValues({ ...values, c3: "" });
    }
  }, [showPanel]);

  React.useEffect(() => {
    if (values.c1 !== "") {
      setShowStatusBar(true);
    }
    if (values.c2 !== "") {
      setShowActivityBar(true);
    }
    if (values.c3 !== "") {
      setShowPanel(true);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[10rem] font-mono text-lg font-bold text-black"
        >
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
            setValues({ ...values, c1: e.currentTarget.innerText })
          }
        >
          Spiritual
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          onSelect={(e) => e.preventDefault()}
          onClick={(e) =>
            setValues({ ...values, c2: e.currentTarget.innerText })
          }
        >
          Option 2
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
          onSelect={(e) => e.preventDefault()}
          onClick={(e) =>
            setValues({ ...values, c3: e.currentTarget.innerText })
          }
        >
          Option 3
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
