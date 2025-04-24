import type {App} from 'vue';
import Tooltip from './index.vue'

Tooltip.install = (app: App) => {
  app.component('v-tooltip', Tooltip)
}

export default Tooltip
export * from './type'