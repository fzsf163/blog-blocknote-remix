import { Power } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Button } from "./ui/button";

export default function Hover_Box() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {" "}
        <Button
          size={"icon"}
          type="submit"
          className="font-bold hover:bg-blue-400 hover:text-black bg-black/60 rounded-full"
        >
          <Power></Power>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="bg-black/60 text-white">
        Click to logout of the system
      </HoverCardContent>
    </HoverCard>
  );
}
