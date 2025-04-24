import type { VNode } from "vue"

export interface MessageProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  message: string | VNode
  duration?: number
  showClose?: boolean
  id?: number
  el?: HTMLElement
  offset?: number
  close?: () => void
}

export interface MessageEmits {
  (e: 'closed'): void
}

export type MessageStackType = Map<number, MessageInstance>

export type MessageInstance = {
  id: number,
  containerEl: HTMLElement
  node: VNode
  selfOffset?: number
}