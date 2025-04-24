type eventType<T> = {[eventName:string]: (val: T) => void};
export type emitFn<T> = (eventName: string, val: T) => void

class EventBus<T> {
  emits: eventType<T> = {}

  constructor(eventObject: eventType<T>) {
    this.emits = {
      ...eventObject
    }
  }

  emit: emitFn<T> = (eventName: string, val: T) => {
    if (this.emits[eventName]) {
      this.emits[eventName](val)
    }
  }
}
export const useEventBus = <T>(eventObject: eventType<T>): emitFn<T> => {
  const eventBus = new EventBus(eventObject)
  return eventBus.emit
}