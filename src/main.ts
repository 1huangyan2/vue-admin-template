import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置浏览器默认样式
import './styles/normalize.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入全局样式
import './styles/global.scss'
// 引入自定义element-ui样式
import './styles/element-ui.scss'

import components from './components'

import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)

// 使用element-plus
app.use(ElementPlus, { locale })

// 使用全局组件
app.use(components)

app.use(store).use(router).mount('#app')
