import type { Options, Placement } from "@popperjs/core";

export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  // visible?: boolean;
  menuls?: boolean;
  arrow?: boolean;
  propOptions?: Partial<Options>
}

export interface TooltipEmits {
  (e: 'visibleChange', value: boolean) : void
  // (e: 'update:visible', value: boolean) : void
}

export interface TooltipInterface {
  open: () => void;
  close: () => void;
  target: () => void;
}