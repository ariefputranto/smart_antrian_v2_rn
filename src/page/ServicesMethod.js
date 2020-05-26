'use strict'

import React, { useState }from 'react'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const ServicesMethod = (props) => {
  return (
    <View style={styles.container}>
    	<TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => alert('arrival by time clicked')}>
    		<Text style={styles.textMethod}>Arrival by Time</Text>
    	</TouchableOpacity>
    	<TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => alert('arrival by place clicked')}>
    		<Text style={styles.textMethod}>Arrival by Place</Text>
    	</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10
	},
	touchableOpacityStyle: {
		backgroundColor: '#43CAFF',
		margin: 10,
		padding: 18,
		borderRadius: 20
	},
	textMethod: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	}
})

export default ServicesMethod