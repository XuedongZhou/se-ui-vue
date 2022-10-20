import { createApp } from 'vue';
import App from './app.vue';

import SeUI from '@se-ui/vue';

const app = createApp(App);

app.use(SeUI);

app.mount('#app');
