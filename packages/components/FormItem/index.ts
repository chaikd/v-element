import type {App} from 'vue';
import FormItem from './index.vue'

FormItem.install = (app: App) => {
  app.component('v-form-item', FormItem)
}

export default FormItem
export * from './type'