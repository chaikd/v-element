/* eslint-disable @typescript-eslint/no-explicit-any */
 
import type { InjectionKey } from "vue";
import type { emitFn } from "../../common/useEventBus";
import type { Rules } from "async-validator";
import type { FormItemField } from "../FormItem/type";
export const FormInjectKey: InjectionKey<FormContext> = Symbol('form') 

export interface FormProps {
  model: Record<string, Object>;
  rules?: Record<string, Object>;
}

// export interface FormEmits {
//   (e: 'submit', form: Record<string, Object>): void;
//   (e: 'reset', form: Record<string, Object>): void;
//   (e: 'validate', form: Record<string, Object>, callback: () => void): void;
//   (e: 'validateField', field: string, callback: () => void): void;
//   (e: 'clearValidate'): void;
//   // (e: 'setRules', rules: Record<string, Object>): void;
//   // (e: 'setModel', model: Record<string, Object>): void;
// }
export interface FormContext {
  model: Record<string, Object>;
  rules: Rules;
  fieldEmit: emitFn<FormItemField>;
}

export interface FormInterface {
  validate: () => Promise<any>
  reset: () => void
}


