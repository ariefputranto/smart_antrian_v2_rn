'use strict'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
	Alert
} from 'react-native'

const ServicesProvider = ({ navigation, route }) => {
	const [serviceProvider, setServiceProvider] = useState([])
  const [guestToken, setGuestToken] = useState(null)

  const getGuestToken = async () => {
    setGuestToken(await AsyncStorage.getItem('guest_token'))
  }

	const getServiceProvider = () => {
		if (guestToken !== null) {
			var options = {
				headers: {
	        'Authorization': 'Bearer ' + guestToken,
	        'Accept': 'application/json'
	      }
			}

			axios.get(url + '/api/guest/service-provider', options).then(response => {
				if (response.data.statusCode == 200) {
					setServiceProvider(response.data.data)
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
		getServiceProvider()
	}, [guestToken])

	const clickHandler = (item) => {
		navigation.navigate('Services', { service_provider: item })
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

export default ServicesProvider