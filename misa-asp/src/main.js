import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';


const app = createApp(App);

createApp(App).use(router).mount('#app');
