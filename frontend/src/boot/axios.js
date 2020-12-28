import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8082/api/'
})

Vue.prototype.$api = instance
