import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8082/api/'
})

export default async ({ store, Vue, router }) => {
  Vue.prototype.$api = axiosInstance
  axiosInstance.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    // Error
    console.log('Error', error)
  })

  axiosInstance.interceptors.request.use(async function (config) {
    // Antes de enviar cada petición se añade el token si existe
    /* const sessionInfo = JSON.parse(localStorage.getItem('___ATAD___'))
    const token = (sessionInfo !== null) ? sessionInfo.token : false
    if (token) {
      if (!config.headers) { config.headers = {} }
      config.headers = {
        Authorization: 'Bearer ' + token
      }
    } */
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
}
