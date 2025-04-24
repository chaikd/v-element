import type { VNode } from "vue";

export interface InputProps {
  type?: string;
  placeholder?: string;
  modelValue: string;
  disabled?: boolean;
  readonly?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  clearable?: boolean;
  visibility?: boolean;
  size?: 'large' | 'small';
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}