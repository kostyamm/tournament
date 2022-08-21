import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import store from './store/index.js'
import './assets/styles/style.scss'
import 'virtual:fonts.css'

const app = createApp(App)

app
    .use(router)
    .use(store)
    .mount('#app')