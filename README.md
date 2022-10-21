<h1 align="center">SeUI for Vue</h1>

## Install

```shell
# NPM
$ npm install @se-ui/vue --save

# Yarn
$ yarn add @se-ui/vue

# pnpm
$ pnpm add @se-ui/vue
```

## Usage

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

## License

SeUI is open source software licensed as [MIT](https://github.com/XuedongZhou/se-ui-vue/blob/main/LICENSE).
