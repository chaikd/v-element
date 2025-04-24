import type {App} from 'vue';
import Dropdown from './index.vue'

Dropdown.install = (app: App) => {
  app.component('v-dropdown', Dropdown)
}

export default Dropdown
export * from './type'