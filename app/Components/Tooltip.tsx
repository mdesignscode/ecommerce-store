import "@/styles/tooltip.css"
import {
  OverlayArrow,
  Tooltip
} from "react-aria-components";

export default function TooltipComponent({ text }: { text: string }) {
  return (
    <Tooltip>
      <OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {text}
    </Tooltip>
  );
}
