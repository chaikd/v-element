import DefaultTheme from 'vitepress/theme'
import '../../../packages/styles/index.css';
import VIcon from '../../../packages/components/Icon/index';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VIcon', VIcon)
  }
}