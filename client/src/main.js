import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import './assets/global.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'



const app = createApp(App)

app.use(router)
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus)
for(const [key,component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key,component)
}
import 'virtual:windi.css'
// app.use(VueAxios, axios)
app.mount('#app')
