'use strict';

import React, { Component } from 'react'
import { Icon } from 'react-native-elements'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

const InitialLoading = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        name='cloud-queue'
        size={ 60 }
        color='#F4FFFC'
        type='material-icons' />
      <Text style={styles.title}>Smart Antrian</Text>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#6A7EFF',
	},
  title: {
    color: '#EBF0FF',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default InitialLoading