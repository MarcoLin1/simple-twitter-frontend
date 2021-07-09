import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://private-19d2c6-simpletwitter5.apiary-mock.com/api'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.user(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
