export type ValueType = boolean | string | number;
export type SwitchSize = 'large' | 'small';

export interface SwitchProps {
  modelValue?: boolean;
  size?: SwitchSize;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: ValueType;
  inactiveValue?: ValueType;
  activeActionIcon?: string;
  inactiveActionIcon?: string;
}

export interface SwitchEmits {
  (e: 'change', value: ValueType): void;
  (e: 'update:modelValue', value: ValueType): void;
}