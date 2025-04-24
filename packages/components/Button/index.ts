import type {App} from 'vue';
import Button from './index.vue'

Button.install = (app: App) => {
  app.component('v-button', Button)
}

export default Button
export * from './type'