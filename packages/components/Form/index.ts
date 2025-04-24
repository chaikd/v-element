import type {App} from 'vue';
import Form from './index.vue'

Form.install = (app: App) => {
  app.component('v-form', Form)
}

export default Form
export * from './type'