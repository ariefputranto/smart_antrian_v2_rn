'use strict'

import React, { useState } from 'react'

import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native'

const ServicesProvider = ({ navigation, route }) => {
	const [serviceProvider, setServiceProvider] = useState([
		{_id: '5e9b6d72ebe8a36c2356524d', name: 'Bank Mandiri', description: 'Sistem antrian bank mandiri', type: 'Bank', icon: 'https://reactnative.dev/img/tiny_logo.png'},
		{_id: '5e9b6d72ebe8a36c2356525d', name: 'Bank Central Asia', description: 'Sistem antrian bca', type: 'Bank', icon: 'https://reactnative.dev/img/tiny_logo.png'},
		{_id: '5e9b6d72ebe8a36c2356526d', name: 'Bank Rakyat Indonesia', description: 'Sistem antrian bri', type: 'Bank', icon: 'https://reactnative.dev/img/tiny_logo.png'},
		{_id: '5e9b6d72ebe8a36c2356527d', name: 'RS Universitas Airlangga', description: 'Sistem antrian rsua', type: 'Bank', icon: 'https://reactnative.dev/img/tiny_logo.png'}
	])

	const clickHandler = (item) => {
		const isResume = route.params?.isResume ?? false
		navigation.navigate('Services', { service_provider: item, isResume: isResume })
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
	    					source={{ uri: item.icon }}
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