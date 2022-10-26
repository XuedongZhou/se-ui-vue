import { createApp } from 'vue';
import App from './app.vue';

import SeUI from '@se-ui/vue';
import '@se-ui/vue/style/index.scss';

const app = createApp(App);

app.use(SeUI);

app.mount('#app');
