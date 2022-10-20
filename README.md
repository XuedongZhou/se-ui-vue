# se-ui for vue

### 安装

```shell
# NPM
$ npm install @se-ui/vue --save

# Yarn
$ yarn add @se-ui/vue

# pnpm
$ pnpm add @se-ui/vue
```

### 使用

```ts
// main.ts
import { createApp } from 'vue';
import SeUI from '@se-ui/vue';
import '@se-ui/vue/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(SeUI);
app.mount('#app');
```
