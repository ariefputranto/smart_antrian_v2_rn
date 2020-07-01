'use strict'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

var baseUrl = 'http://localhost:3000'
if (Platform.OS !== 'ios') {
  baseUrl = 'http://192.168.1.3:3000'
}

const userApi = axios.create({
  'baseURL': baseUrl
})

const guestApi = axios.create({
  'baseURL': baseUrl
})


// Logout
const logout = async () => {
  await AsyncStorage.removeItem('token')
}

// Add a request interceptor
userApi.interceptors.request.use(async config => {
  var token = await AsyncStorage.getItem('token')
  config.headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
userApi.interceptors.response.use(response => {

  // if expired extend it
  if (response.data.message == "Authorization token expired") {
    logout()
    return false
  }

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// generate imei for guest
const generateImei = async () => {
  var checkImei = await AsyncStorage.getItem('imei')
  if (checkImei === null) {
    const date = new Date().getTime().toString()
    checkImei = Math.round(Math.random() * 10000000) + date
    await AsyncStorage.setItem('imei', checkImei)
  }

  return checkImei
}

// login as guest
const loginGuest = async () => {
  const params = {
    imei: await generateImei(),
    expired_in: 86400 // 1 day expired
  }

  console.log(params)

  const response = await axios.post(baseUrl + '/api/login-guest', params)
  const token = response.data.data.token
  await AsyncStorage.setItem('guest_token', token)
  return token
}

// Add a request interceptor
guestApi.interceptors.request.use(async config => {
  var token = await AsyncStorage.getItem('guest_token')
  // console.log(token)
  config.headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
guestApi.interceptors.response.use(async response => {

  // if expired extend it
  if (response.data.message == "Authorization token expired") {
    var token = await loginGuest()
    var config = response.config
    config.headers.Authorization = 'Bearer ' + token

    return axios.request(config)
  }

  // if token invalid refresh
  if (response.data.message == "Authorization token is invalid: jwt malformed") {
    var token = await loginGuest()
    var config = response.config
    config.headers.Authorization = 'Bearer ' + token

    return axios.request(config)
  }

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export {userApi, guestApi}