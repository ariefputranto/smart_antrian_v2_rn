'use strict'

import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment-timezone'

import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native'

const ServicesProviderResume = ({ navigation, route }) => {
	const [serviceProvider, setServiceProvider] = useState([])
	const [book, setBook] = useState(null)
	var getBookedInterval = null

  const getBooked = async () => {
  	var booked = await AsyncStorage.getItem('booked')
  	if (booked !== null) {
  		booked = JSON.parse(booked)
  	} else {
  		booked = []
  	}

  	booked = booked.filter(item => {
  		// if tomorrow not include it and allow resume if from get location
  		if (item.booked_time == null || moment().unix() <= moment(new Date(item.booked_time)).endOf('day').unix() ) {
  			return item
  		}
  	})

  	await AsyncStorage.setItem('booked', JSON.stringify(booked))
		setBook(booked)
  }

  const filterBooked = () => {
  	var booked = book
  	if (booked !== null) {
  		var listServiceProvider = []
	  	for (var i = 0; i < booked.length; i++) {
	  		var filters = listServiceProvider.filter(item => item._id == booked[i].service_provider_id._id)
	  		if (filters.length == 0) {
	  			listServiceProvider.push(booked[i].service_provider_id)
	  		}
	  	}

	  	setServiceProvider(listServiceProvider)
  	}
  }

	useEffect(() => {
		getBookedInterval = setInterval(() => {
			getBooked()
		}, 1000)

		return () => {
			clearInterval(getBookedInterval)
		}
	}, [])

	useEffect(() => {
		filterBooked()
	}, [book])

	const clickHandler = (item) => {
		navigation.navigate('ServicesResume', { service_provider: item })
	}

  return (
    <View style={styles.container}>
    	<FlatList
    		numColumns = {2}
    		keyExtractor = {(item) => item._id}
    		data = {serviceProvider}
    		renderItem = {({ item }) => (
    			<TouchableOpacity style={ styles.touchAbleContent } onPress={ () => clickHandler(item) }>
	    			<View style={styles.contentBody}>
	    				<Image
	    					style={styles.tinyLogo}
	    					source={{ uri: url_service_provider + item.icon }}
	  					/>
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
		padding: 10
	},
	touchAbleContent : {
		flex: 1,
		padding: 15,
		backgroundColor: '#43CAFF',
		margin: 10,
		borderRadius: 15
	},
	contentBody: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	tinyLogo: {
		width: 50,
		height: 50,
		borderRadius: 30
	},
	textTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 15,
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

export default ServicesProviderResume