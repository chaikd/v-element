import './assets/base.css'
// import './assets/main.css'
// import './styles/index.css'
import '@v-element/styles/index.css'

import VElement from '@v-element/components/index'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(VElement)
  .mount('#app')
