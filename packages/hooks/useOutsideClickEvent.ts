import { onMounted, onUnmounted } from "vue"

export const useOutsideClickEvent = (elementRef: HTMLElement | null, cb: () => void) => {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement
    if (elementRef && elementRef.contains(target)) {
      return
    }
    cb()
  }
  const addEvent = () => {
    document.addEventListener("click", handleClick)
  }
  const removeEvent = () => {
    document.removeEventListener("click", handleClick)
  }
  onMounted(() => {
    addEvent()
  })
  onUnmounted(() => {
    removeEvent()
  })
  return {
    destroy: () => {
      removeEvent()
    }
  }
}