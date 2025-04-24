import type {App} from 'vue';
import Message from './index.vue'

Message.install = (app: App) => {
  app.component('v-message', Message)
}

export default Message
export * from './type'