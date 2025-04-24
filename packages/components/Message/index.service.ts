import type { MessageInstance, MessageProps } from "./type";
import { render, h, reactive, type Reactive } from "vue";
import VMessage from "./index.vue";

const MessageStack: Reactive<Array<MessageInstance>> = reactive([])

const defaultProps: MessageProps = {
  message: '',
  type: 'info',
  duration: 3000,
  showClose: false,
  offset: 20,
}

export const Message = (option: MessageProps) => {
  const messageComponent = addMessage(option)
  MessageStack.push(messageComponent)
  return {
    destroy: () => {
      removeMessage(messageComponent.id)
    }
  }
}

const addMessage = (option: MessageProps): MessageInstance => {
  const containerEl = document.createElement('div')
  const id = Date.now()
  const node = h(VMessage, {
    ...defaultProps,
    ...option,
    id,
    close: () => {
      removeMessage(id)
    }}
  )
  render(node, containerEl)
  document.body.appendChild(containerEl.firstElementChild as HTMLElement)
  return {
    node,
    containerEl,
    id
  }
}

const removeMessage = async (id: number) => {
  const message: MessageInstance = MessageStack.find(v => v.id === id)!
  const containerEl = message?.containerEl
  if (message) {
    render(null, containerEl)
    MessageStack.splice(MessageStack.indexOf(message), 1)
  }
}

const getCurrentInstance = (id: number): MessageInstance | undefined => {
  if (!id) return
  return MessageStack.find(v => v.id === id)
}

const getPreBottomOffset = (id: number): number => {
  const message = getCurrentInstance(id)
  const currentIndex = MessageStack.indexOf(message!)
  const preMessage = MessageStack[currentIndex - 1]
  if (!preMessage) return 0
  const rectData = preMessage.node?.el?.getBoundingClientRect()
  return (rectData.top || 0) + (rectData.scrollHeight || 0) + preMessage.node.props?.offset
}

export {
  getCurrentInstance,
  getPreBottomOffset
}