# 快速开始

## 用法

### 完整引入

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

您可以从现在起启动您的项目。 对于每个组件的用法，请参考单个组件对应的文档。
