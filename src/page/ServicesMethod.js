'use strict'

import React, { useState }from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const ServicesMethod = ({ navigation, route }) => {
	const addBooked = async (services) => {
  	var booked = await AsyncStorage.getItem('booked')
  	if (booked !== null) {
  		booked = JSON.parse(booked)
  	} else {
  		booked = []
  	}

  	// remove old booked
  	booked = booked.filter(b => b._id != services._id)

  	// add new booked
		booked.push(services)

		await AsyncStorage.setItem('booked', JSON.stringify(booked))
  }

	const arrivalByTime = () => {
		navigation.navigate('ArrivalByTime', { services: route.params.services })
	}

	const arrivalByPlace = () => {
		addBooked(route.params.services)
		navigation.navigate('Queue', { services: route.params.services })
	}

  return (
    <View style={styles.container}>
    	<TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => arrivalByTime()}>
    		<Text style={styles.textMethod}>Arrival by Time</Text>
    	</TouchableOpacity>
    	<TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => arrivalByPlace()}>
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