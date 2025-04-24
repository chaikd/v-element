import type {App} from 'vue';
import Switch from './index.vue'

Switch.install = (app: App) => {
  app.component('v-switch', Switch)
}

export default Switch
export * from './type'