/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react'
import Navigator from './src/routes/Navigation'
import './src/global/config'

export default function App() {
  return (
    <Navigator />
  )
}
