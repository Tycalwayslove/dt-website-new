import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import router from '@/router'
import App from './App.vue'

import '@/assets/styles/tailwind.css'
import '@/assets/styles/base.css'
import registerDirectives from '@/plugins/directives'
import { bootstrap } from '@/auto-init'

library.add(faBars, faMoon, faSun)

const app = createApp(App)
app.use(createPinia())
bootstrap()
app.use(router)
app.use(ElementPlus)
app.component('Fa', FontAwesomeIcon)
registerDirectives(app)

app.mount('#app')
