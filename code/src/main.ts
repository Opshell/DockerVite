import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { store, key } from './store';
import router from './router';

const app = createApp(App);
app.use(store, key); // 傳入 Injection Key
app.use(router);

app.mount('#app');
