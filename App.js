/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigator from './src/routes/UserDrawer'

// import InitialLoading from './src/page/InitialLoading'
// import ServicesProvider from './src/page/ServicesProvider'
// import Services from './src/page/Services'
// import ServicesMethod from './src/page/ServicesMethod'
// import ArrivalByTime from './src/page/ArrivalByTime'
// import Queue from './src/page/Queue'
// import Login from './src/page/Login'
// import CallQueue from './src/page/CallQueue'
// import Loket from './src/page/Loket'

export default function App() {
  return (
    <Navigator />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
