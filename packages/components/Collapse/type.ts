import type { InjectionKey } from "vue";

export type nameType = string | number | undefined
export interface CollapseItemProps {
  name?: nameType
  title?: string
  content?: string
  isActive?: boolean
  isDisabled?: boolean
}

export interface CollapseItemEmits {
  (e: 'click'): void
  (e: 'update:modelValue', value: boolean): void
}

export interface CollapseProps {
  activeNames: nameType[]
  accordion?: boolean
}

export interface CollapseContext {
  activeNames: nameType[]
  toggle(name: nameType): void
}

export interface CollapseEmits {
  (e: 'update:activeNames', activeNames: string[]): void;
  (e: 'change', activeNames: nameType[]): void;
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapse')


