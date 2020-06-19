'use strict'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const userApi = axios.create({
  'baseURL': 'http://localhost:3000'
})

const guestApi = axios.create({
  'baseURL': 'http://localhost:3000'
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

  console.log(checkImei)

  return checkImei
}

// login as guest
const loginGuest = () => {
  const params = {
    imei: generateImei(),
    expired_in: 86400 // 1 day expired
  }

  axios.post(url + '/api/login-guest', params).then(async response => {
    if (response.data.statusCode == 200) {
      await AsyncStorage.setItem('guest_token', response.data.data.token)
    }
  }, error => {
    Alert.alert('Warning!', error.message)
  })
}

// Add a request interceptor
guestApi.interceptors.request.use(async config => {
  var token = await AsyncStorage.getItem('guest_token')
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
guestApi.interceptors.response.use(response => {

  // if expired extend it
  if (response.data.message == "Authorization token expired") {
    loginGuest()
    return false
  }

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export {userApi, guestApi}