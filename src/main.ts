import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import PokeApi from "@/services/api/PokeApi";

const app = createApp(App)

app.use(router)

app.mount('#app')
