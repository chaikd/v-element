
import type { VNode } from 'vue';
import type { TooltipProps } from '../Tooltip/type';
export interface DropdownItem {
  label: string | VNode
  value: string
  disabled?: boolean
}
export interface DropdownProps extends TooltipProps {
  items: Array<DropdownItem>
}

export interface DropdownEmits {
  (e: 'selected', item: DropdownItem): void
  (e: 'visibleChange', val: boolean): void
}