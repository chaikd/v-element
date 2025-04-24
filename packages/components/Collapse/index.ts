import type {App} from 'vue';
import Collapse from './index.vue'

Collapse.install = (app: App) => {
  app.component('v-collapse', Collapse)
}

export default Collapse
export * from './type'