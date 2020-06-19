'use strict';

import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

const ServicesResume = ({ navigation, route }) => {
	const [services, setServices] = useState([])
	const [booked, setBooked] = useState(null)

  const getBooked = async () => {
  	setBooked(await AsyncStorage.getItem('booked_by_time'))
  }

  const filterBooked = () => {
  	var currentBooked = booked
  	if (currentBooked !== null) {
  		currentBooked = JSON.parse(currentBooked)
  	} else {
  		currentBooked = []
  	}

  	var serviceProvider = route.params.service_provider
  	var listServices = []
  	for (var i = 0; i < currentBooked.length; i++) {
  		if (currentBooked[i].service_provider_id._id != serviceProvider._id) {
  			continue
  		}

  		// filter unique
  		var filters = listServices.filter(item => item._id == currentBooked[i]._id)
  		if (filters.length == 0) {
  			listServices.push(currentBooked[i])
  		}
  	}

  	setServices(listServices)
  }

  useEffect(() => {
		getBooked()
  }, [])

	useEffect(() => {
		filterBooked()
	}, [booked])

	const clickHandler = (item) => {
		navigation.navigate('Queue', { services: item })
	}

  return (
    <View style={ styles.container }>

    	<FlatList
    		contentContainerStyle = { styles.flatListMiddle }
    		keyExtractor = {(item) => item._id}
    		data = {services}
    		renderItem = {({ item }) => (
    			<TouchableOpacity onPress={ () => clickHandler(item) }>
	    			<View style={styles.contentBody}>
	    				<Text style={styles.textTitle}>{item.name}</Text>
	    				<Text style={styles.textDescription}>{item.description}</Text>
	    			</View>
	    		</TouchableOpacity>
    		)}
    	/>

    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	flatListMiddle: {
		flexGrow: 1,
		justifyContent: 'center'
	},
	contentBody: {
		padding: 15,
		backgroundColor: '#43CAFF',
		margin: 10,
		borderRadius: 15
	},
	textTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff'
	},
	textDescription: {
		fontSize: 12,
		marginTop: 5,
		textAlign: 'center',
		color: '#fff'
	}
})

export default ServicesResume;