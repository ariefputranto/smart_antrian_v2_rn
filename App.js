/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import InitialLoading from './src/page/InitialLoading'
import ServicesProvider from './src/page/ServicesProvider'
import Services from './src/page/Services'
import ServicesMethod from './src/page/ServicesMethod'
import ArrivalByTime from './src/page/ArrivalByTime'

export default function App() {
  return (
    <ArrivalByTime />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
