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

const Loket = (props) => {
	const [loket, setLoket] = useState([
		{ "_id" : "5e9b6fc189ccbe6c793bbf36", "user_id" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : {_id: "5e9b6f8c89ccbe6c793bbf34", name: 'Customer Service'}, "name" : "Loket 1", "token_expiration_time" : 86400, "latitude" : -7.279889855430536, "longitude" : 112.79027938842775, "assign_user_id" : "5e9b6f6589ccbe6c793bbf32", "time" : "2020-04-18T21:23:13.502Z", "inner_distance" : 5, "outer_distance" : 10, "__v" : 0 },
		{ "_id" : "5e9b6fd789ccbe6c793bbf37", "user_id" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : {_id: "5e9b6f8c89ccbe6c793bbf34", name: 'Customer Service'}, "name" : "Loket 2", "token_expiration_time" : 86400, "latitude" : -7.279038466566971, "longitude" : 112.78993606567384, "assign_user_id" : null, "time" : "2020-04-18T21:23:35.122Z", "inner_distance" : 5, "outer_distance" : 10, "__v" : 0 }
	])

	const clickHandler = (id) => {
		alert("Element "+id+" click")
	}

  return (
    <View style={ styles.container }>

    	<FlatList
    		contentContainerStyle = { styles.flatListMiddle }
    		keyExtractor = {(item) => item._id}
    		data = {loket}
    		renderItem = {({ item }) => {
    			// if not assign
    			if (item.assign_user_id !== null) {
    				return (
		    			<View style={styles.contentBodyAssigned}>
		    				<Text style={styles.textTitle}>{item.name}</Text>
		    				<Text style={styles.textDescription}>{item.service_id.name}</Text>
		    			</View>
		    		)
		    	// if assign
    			} else {
    				return (
		    			<TouchableOpacity onPress={ () => clickHandler(item._id) }>
			    			<View style={styles.contentBody}>
			    				<Text style={styles.textTitle}>{item.name}</Text>
			    				<Text style={styles.textDescription}>{item.service_id.name}</Text>
			    			</View>
			    		</TouchableOpacity>
		    		)
    			}
    		}}
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
	contentBodyAssigned: {
		padding: 15,
		backgroundColor: '#E10005',
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

export default Loket;