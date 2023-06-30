import './assets/main.css'
import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'

import './util/leaflet.ChineseTmsProviders.js'


const map=reactive({
  value:null
})
const app = createApp(App)
app.config.globalProperties.L = L
app.provide('globalMap',map)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
