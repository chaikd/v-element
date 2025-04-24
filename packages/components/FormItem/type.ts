import type { RuleItem } from "async-validator";
import type { InjectionKey } from "vue";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const FormItemInjectKey: InjectionKey<FormItemContext> = Symbol('formItem') 

export interface FormItemProps {
  prop: string;
  label?: string;
  rules?: Record<string, Object>;
  required?: boolean;
  // error?: string;
  // validateStatus?: 'success' | 'error' | 'validating' | '';
  // showMessage?: boolean;
  // inlineMessage?: boolean;
  // size?: string;
  // disabled?: boolean;
}

export interface FormItemField {
  prop: string;
  validate: () => Promise<any>,
  clearValidate: () => void,
  resetField: () => void,
}

export interface ItemRule extends RuleItem {
  trigger: string;
}

export interface FormItemContext {
  itemRule: ItemRule[] | ItemRule,
  validate: () => void
  // blur: () => void,
  // chang: () => void,
  // input: () => void
}