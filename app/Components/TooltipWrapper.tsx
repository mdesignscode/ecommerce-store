import {
  OverlayArrow,
  Tooltip,
  type TooltipProps,
} from "react-aria-components";
import "@/styles/tooltip.css";

interface TooltipWrapperProps extends Omit<TooltipProps, "children"> {
  children: React.ReactNode;
}

export default function TooltipWrapper({ children, ...props }: TooltipWrapperProps) {
  return (
    <Tooltip {...props}>
      <OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </Tooltip>
  );
}
