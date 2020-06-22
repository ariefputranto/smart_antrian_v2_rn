'use strict'

import React, { useState, useEffect }from 'react'
import { guestApi } from '../component/CustomAxios'
import AsyncStorage from '@react-native-community/async-storage'

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  YellowBox,
  TouchableOpacity
} from 'react-native'

const Queue = ({ navigation, route }) => {
	const [queue, setQueue] = useState([
		{ "_id" : "5e9c83eccc641089eeb106e6", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 1, "date" : "2020-04-20", "time" : "2020-04-19T17:01:32.698Z", "__v" : 0 },
		{ "_id" : "5e9c84001a186789feeada45", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 2, "date" : "2020-04-20", "time" : "2020-04-19T17:01:52.429Z", "__v" : 0 },
		{ "_id" : "5e9c844789561b8a095a09d3", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 3, "date" : "2020-04-20", "time" : "2020-04-19T17:03:03.548Z", "__v" : 0 },
		{ "_id" : "5e9c8465cf16518a11ccbada", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 4, "date" : "2020-04-20", "time" : "2020-04-19T17:03:33.598Z", "__v" : 0 },
		{ "_id" : "5e9c8482cf16518a11ccbadb", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 5, "date" : "2020-04-20", "time" : "2020-04-19T17:04:02.764Z", "__v" : 0 },
		{ "_id" : "5e9c8494cf16518a11ccbadc", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 6, "date" : "2020-04-20", "time" : "2020-04-19T17:04:20.393Z", "__v" : 0 },
		{ "_id" : "5e9c84e2cf16518a11ccbadd", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 7, "date" : "2020-04-20", "time" : "2020-04-19T17:05:38.539Z", "__v" : 0 },
		{ "_id" : "5e9c85191567d78a3f61a365", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 8, "date" : "2020-04-20", "time" : "2020-04-19T17:06:33.142Z", "__v" : 0 },
		{ "_id" : "5e9c86528023d48a7f5cbd31", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 9, "date" : "2020-04-20", "time" : "2020-04-19T17:11:46.996Z", "__v" : 0 },
		{ "_id" : "5e9c86649609f88a8bfdf2fe", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 10, "date" : "2020-04-20", "time" : "2020-04-19T17:12:04.135Z", "__v" : 0 },
		{ "_id" : "5e9c872cf60cd28ab05f7cb2", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 11, "date" : "2020-04-20", "time" : "2020-04-19T17:15:24.448Z", "__v" : 0 },
		{ "_id" : "5e9c87c6daaee58ad2eee554", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 12, "date" : "2020-04-20", "time" : "2020-04-19T17:17:58.927Z", "__v" : 0 },
		{ "_id" : "5e9c87e5ed5aa78adf90db28", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 13, "date" : "2020-04-20", "time" : "2020-04-19T17:18:29.283Z", "__v" : 0 },
		{ "_id" : "5e9c87fbed5aa78adf90db29", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 14, "date" : "2020-04-20", "time" : "2020-04-19T17:18:51.812Z", "__v" : 0 },
		{ "_id" : "5e9c8816de382f8af1f8c3c6", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 15, "date" : "2020-04-20", "time" : "2020-04-19T17:19:18.109Z", "__v" : 0 },
		{ "_id" : "5e9c885cde382f8af1f8c3c7", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 16, "date" : "2020-04-20", "time" : "2020-04-19T17:20:28.357Z", "__v" : 0 },
		{ "_id" : "5e9c89573ce4438b32ba86d9", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 17, "date" : "2020-04-20", "time" : "2020-04-19T17:24:39.336Z", "__v" : 0 },
		{ "_id" : "5e9c896f3ce4438b32ba86da", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 18, "date" : "2020-04-20", "time" : "2020-04-19T17:25:03.915Z", "__v" : 0 },
		{ "_id" : "5e9c898e45297c8b3dae6b24", "is_hold" : false, "is_called" : false, "token" : "5e9b6f6589ccbe6c793bbf32", "service_provider_id" : "5e9b6d72ebe8a36c2356524d", "service_id" : "5e9b6f8c89ccbe6c793bbf34", "code" : "A", "number" : 19, "date" : "2020-04-20", "time" : "2020-04-19T17:25:34.563Z", "__v" : 0 },
	])
	const [service, setService] = useState(null)

	const cancelQueue = () => {
		navigation.popToTop()
	}

	YellowBox.ignoreWarnings(['VirtualizedLists should never be nested'])

	// const get

	useEffect(() => {
		setService(route.params.services)
	}, [])

	useEffect(() => {
		console.log(service)
	}, [service])

  return (

  	<SafeAreaView style={ styles.sav }>
	  	<ScrollView style={ styles.sv }>
		    <View style={ styles.container }>

		    	<View style={styles.queueContainer}>
		    		<Text style={styles.queueText}>Your number</Text>
		    		<Text style={styles.queue}>A20</Text>
		    		<Text style={styles.queueHelper}>Make sure you are around the area to get queue</Text>
		    	</View>

		  		<Text style={styles.totalWaiting}>Total waiting users : 199999</Text>

		    	<View style={styles.waitingQueueContainer}>
		    		<Text style={styles.waitingQueueText}>Waiting users</Text>
		    		<FlatList
		    			data = {queue}
		    			keyExtractor = {(item) => item._id}
		    			renderItem = {({item, index}) => (
		    				<Text style={ index % 2 == 0 ? styles.waitingQueueEven : styles.waitingQueueOdd }>
		    				  {item.code}{item.number} 
		    				</Text>
		    			)}
		    		/>
		    	</View>

		    	<TouchableOpacity onPress={() => cancelQueue()}>
			  		<Text style={styles.cancelQueue}>Cancel Queue</Text>
		    	</TouchableOpacity>

		    </View>
	    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	sav: {
		flex: 1,
	},
	sv: {
    marginBottom: 20,
    marginTop: 20,
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	queueContainer: {
		width: 300,
		borderWidth: 1,
		borderColor: '#C7C7C7',
		padding: 20,
		marginBottom: 15,
	},
	queueText: {
		textAlign: 'center',
		fontSize: 30,
	},
	queue: {
		textAlign: 'center',
		fontSize: 40,
		color: '#43CAFF',
		marginTop: 10,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	queueHelper: {
		textAlign: 'center',
		fontSize: 14,
		color: '#868686'
	},
	totalWaiting: {
		width: 300,
		padding: 20,
		fontSize: 20,
		color: '#fff',
		fontWeight: "600",
		backgroundColor: '#43CAFF',
		marginBottom: 15,
	},
	waitingQueueContainer: {
		maxHeight: 400,
		width: 300,
		backgroundColor: '#43CAFF',
		padding: 15,
		marginBottom: 15,
	},
	waitingQueueText: {
		fontSize: 25,
		textAlign: 'center',
		marginBottom: 7,
		color: '#fff'
	},
	waitingQueueOdd: {
		padding: 10,
		backgroundColor: '#fff',
		textAlign: 'center',
		color: '#43CAFF',
		fontSize: 20,
		fontWeight: "600",
	},
	waitingQueueEven: {
		padding: 10,
		backgroundColor: '#F3F3F3',
		textAlign: 'center',
		color: '#43CAFF',
		fontSize: 20,
		fontWeight: "600",
	},
	cancelQueue: {
		color: '#DE0505',
		fontSize: 16,
	}
})

export default Queue