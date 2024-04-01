import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
type TrigElement = {
  triggerName: React.ReactNode;
  toolContent: string;
};
export default function ToolTip_Box({ toolContent, triggerName }: TrigElement) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={10}>
        <TooltipTrigger> {triggerName}</TooltipTrigger>
        <TooltipContent>
          <p>{toolContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
