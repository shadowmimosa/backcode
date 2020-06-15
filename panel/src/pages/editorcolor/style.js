import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

import '@static/styles/elementui-reset/index.scss';
import '@static/styles/base/common.scss'
import '@static/font/iconfont.css'
import {
  Input,
  Radio,
  Tree,
  Button,
  Pagination,
  ColorPicker
} from 'element-ui'
Vue.use(Tree).use(Input).use(Radio).use(Button).use(Pagination).use(ColorPicker)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
