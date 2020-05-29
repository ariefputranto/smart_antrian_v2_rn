'use strict';

import React, { useState } from 'react'

import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

const Services = ({ navigation, route }) => {
	const [services, setServices] = useState([
		{ "_id" : "5e9b6f8c89ccbe6c793bbf34", "number_loket" : 3, "user_id" : "5e9b6d96ebe8a36c2356524e", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "name" : "Customer Service", "code" : "A", "time" : "2020-04-18T21:22:20.848Z", "description" : "Customer service bank mandiri cabang surabaya", "__v" : 0 },
		{ "_id" : "5e9b6fa189ccbe6c793bbf35", "number_loket" : 2, "user_id" : "5e9b6d96ebe8a36c2356524e", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "name" : "Teller", "code" : "B", "time" : "2020-04-18T21:22:41.808Z", "description" : "Teller bank mandiri cabang surabaya", "__v" : 0 }
	])

	const clickHandler = (item) => {
		const { isResume } = route.params
		if (isResume)
			navigation.navigate('Queue', { services: item })
		else 
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