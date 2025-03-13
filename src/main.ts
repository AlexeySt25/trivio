import './assets/tailwind.css'
import './assets/reset.css'
import './assets/normalize.css'
import './assets/base.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
