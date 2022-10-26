import DefaultTheme from 'vitepress/theme';

import { globals } from '../vitepress';

import SeUI from '@se-ui/vue';

import '@se-ui/vue/dist/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(SeUI);

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  }
};
