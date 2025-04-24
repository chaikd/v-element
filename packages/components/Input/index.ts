import type {App} from 'vue';
import Input from './index.vue'

Input.install = (app: App) => {
  app.component('v-input', Input)
}

export default Input
export * from './type'