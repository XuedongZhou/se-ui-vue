import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/se-ui-vue/',
  title: 'se-ui-vue',
  description: 'se-ui vue components library',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/XuedongZhou/se-ui-vue' }],
    nav: [
      {
        text: '文档',
        link: '/guide/index'
      },
      {
        text: '组件',
        link: '/components/index'
      }
    ],
    sidebar: [
      {
        items: [
          { text: '介绍', link: '/guide/introduce' },
          { text: '安装', link: '/guide/installation' },
          { text: '快速开始', link: '/guide/quickstart' }
        ]
      },
      {
        text: '组件',
        items: [{ text: '按钮 Button', link: '/components/button' }]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present snoweast'
    }
  }
});
