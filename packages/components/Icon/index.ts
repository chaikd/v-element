import type {App} from 'vue';
import {fas} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Icon from './index.vue'

library.add(fas)

Icon.install = (app: App) => {
  app.component('v-icon', Icon)
}

export default Icon
export * from './type'