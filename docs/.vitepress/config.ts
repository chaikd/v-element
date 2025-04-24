import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "v-element",
  description: "一个适用于vue3的组件库",
  "cleanUrls": true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/overview' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Overview 组件总览',
        items: [
          {text: '组件总览', link: 'overview'},
        ]
      },
      {
        text: '基础组件',
        items: [
          {text: 'Icon 图标', link: '/components/icon'},
          {text: 'Button 按钮', link: '/components/button'},
        ]
      },
      {
        text: 'Form 表单元素',
        items: [
          {text: 'Input 输入框', link: '/components/input'},
          {text: 'Switch 开馆', link: '/components/switch'},
          {text: 'Form 表单', link: '/components/form'},
        ]
      },
      {
        text: 'Data 数据展示',
        items: [
          {text: 'Collapse 折叠面板', link: '/components/collapse'},
        ]
      },
      {
        text: 'Feedback 反馈组件',
        items: [
          {text: 'Message 消息提示', link: '/components/message'},
        ]
      },
      {
        text: 'Navigation 导航',
        items: [
          {text: 'Dropdown 下拉菜单', link: '/components/deopdown'},
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  }
})
