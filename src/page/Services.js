'use strict';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from 'react-native'

const Services = ({ navigation, route }) => {
	const [services, setServices] = useState([])
	const [guestToken, setGuestToken] = useState(null)

  const getGuestToken = async () => {
    setGuestToken(await AsyncStorage.getItem('guest_token'))
  }

	const getServices = () => {
		var serviceProvider = route.params.service_provider
		if (guestToken !== null) {
			var options = {
				headers: {
	        'Authorization': 'Bearer ' + guestToken,
	        'Accept': 'application/json'
	      }
			}

			axios.get(url + '/api/guest/services-by-provider/' + serviceProvider._id, options).then(response => {
				if (response.data.statusCode == 200) {
					setServices(response.data.data)
				} else {
					Alert.alert('Warning!', response.data.message)
				}
			}, error => {
				Alert.alert('Warning!', error.message)
			})
		}
	}

	useEffect(() => {
		getGuestToken()
		getServices()
	}, [guestToken])

	const clickHandler = (item) => {
		navigation.navigate('ServicesMethod', { services: item })
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

export default Services;