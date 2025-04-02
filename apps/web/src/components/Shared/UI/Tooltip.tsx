import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  className?: string;
  content: ReactNode;
  placement?: "bottom" | "left" | "right" | "top";
  withDelay?: boolean;
}

export const Tooltip = ({
  children,
  className = "",
  content,
  placement = "right",
  withDelay = false
}: TooltipProps) => {
  return (
    <RadixTooltip.Provider delayDuration={withDelay ? 400 : 0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <span className={className}>{children}</span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="!rounded-lg !text-xs !leading-6 z-10 hidden bg-neutral-700 px-3 py-0.5 text-white tracking-wide sm:block"
            side={placement}
            sideOffset={5}
          >
            <span>{content}</span>
            <RadixTooltip.Arrow className="fill-neutral-700" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
