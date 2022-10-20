import DefaultTheme from 'vitepress/theme';
import SeUI from '@se-ui/vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(SeUI);
  }
};
