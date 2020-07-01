'use strict'

import React, { useState, useEffect, useRef }from 'react'
import { guestApi } from '../component/CustomAxios'
import AsyncStorage from '@react-native-community/async-storage'
import GetLocation from 'react-native-get-location'
// import useInterval from '../hooks/UseInterval'

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  YellowBox,
  TouchableOpacity,
	Alert
} from 'react-native'

const Queue = ({ navigation, route }) => {
	const [queue, setQueue] = useState([])
	const [service, setService] = useState(null)
	const [totalWaitingUser, setTotalWaitingUser] = useState(0)
	const [positionHistory, setPositionHistory] = useState([])
	const [avgWaitingTime, setAvgWaitingTime] = useState(0)
	const [holdQueue, setHoldQueue] = useState(null)
	const [intervalChecker, setIntervalChecker] = useState(null)
	var ws = null
	const intervalGetPosition = 5

	// get waiting list user
	const getWaitingList = () => {
		guestApi.get('/api/guest/queue/get-list/' + service._id).then(response => {
			if (response.data.statusCode == 200) {
				setQueue(response.data.data)
			} else {
				Alert.alert('Warning!', response.data.message)
			}
		}, error => {
			Alert.alert('Warning!', error.message)
		})
	}

	// get hold queue
	const getHoldQueue = async () => {
		var currentQueue = await AsyncStorage.getItem('hold_queue_' + (service._id))
  	if (currentQueue !== null) {
  		currentQueue = JSON.parse(currentQueue)
  	} else {
  		currentQueue = null
  	}

		setHoldQueue(currentQueue)

  	console.log('current hold queue: ')
  	console.log(currentQueue)
	}

	// cancel queue button click
	const cancelQueue = () => {
		navigation.popToTop()
		AsyncStorage.clear()
	}

	// initial config websocket
	const initWs = () => {
		var host = url_ws + '/' + service.service_provider_id._id
		ws = new WebSocket(host)

		ws.onmessage = msg => {
			// console.log(msg.data)
			var response = JSON.parse(msg.data)
			if (typeof response.data.url !== 'undefined') {
				var url = response.data.url

				// if last called
				// if (url == '/queue/last-called') {
				// 	if (typeof response.data.last_call !== 'undefined') {
				// 		this.lastCalledNumber = response.data.last_call
				// 		console.log(this.lastCalledNumber)
				// 	}
				// }

				// get count
				if (url == '/queue/count') {
					if (typeof response.data.count_queue !== 'undefined') {
						setTotalWaitingUser(response.data.count_queue)
					}
				}

				// when receive new queue
				if (url == '/queue/new') {
					if (service._id == response.data.queue.service_id) {
						// add new queue into waiting list
						setQueue(oldQueue => {
							// function to compare
							function compare( a, b ) {
							  if ( a.number < b.number ){
							    return -1;
							  }

							  if ( a.number > b.number ){
							    return 1;
							  }

							  return 0;
							}

							var currentQueue = [...oldQueue, response.data.queue]
							currentQueue.sort(compare)
							return currentQueue
						})

						// get last count
						ws.send(JSON.stringify({url: '/queue/count', service_id: service._id}))
					}
				}

				// on service called calculate waiting time
				if (url == '/queue/call' && response.statusCode == 200) {
					// get average waiting time
					ws.send(JSON.stringify({url: '/queue/average-waiting-time', service_id: service._id}))
				}

				// get average waiting time
				if (url == '/queue/average-waiting-time' && response.statusCode == 200) {
					setAvgWaitingTime(response.data.average_time)
				}

			}
		}

		ws.onopen = () => {
			if (typeof service._id !== 'undefined') {
				// this.ws.send(JSON.stringify({url: '/queue/last-called', service_id: service._id, loket_id: this.singleLoket._id}))
				ws.send(JSON.stringify({url: '/queue/count', service_id: service._id}))
				ws.send(JSON.stringify({url: '/queue/average-waiting-time', service_id: service._id}))
			}
		}
	}

	// initialize service
	useEffect(() => {
		setService(route.params.services)
	}, [])

	// initialize get list queue
	useEffect(() => {
		console.log(service)

		// init waiting list
		if (service !== null) {
			getWaitingList()
			getHoldQueue()
		}
	}, [service])

	// initialize websocket
	useEffect(() => {
		// init websocket
		if (service !== null) {
			initWs()
		}

		return () => {
			// close websocket connection
			if (ws !== null) {
				ws.close()
			}
		}
	}, [queue])

	// get position
	const getPosition = () => {
		// get location
		GetLocation.getCurrentPosition({
	    enableHighAccuracy: true,
	    timeout: 15000,
		}).then(location => {
			console.log(location)

			var currentPosition = {
				latitude: location.latitude,
				longitude: location.longitude
			}

			// set current position
			if (positionHistory.length <= 10) {
				setPositionHistory(position => [...position, currentPosition])
			} else {
				setPositionHistory(position => {
					position.shift()
					return [...position, currentPosition]
				})
			}

		}, error => {
			console.log('location error: ' + error.data.message)
		})
	}

	// haversine calculation
	const haversine = (coord1, coord2) => {
		Number.prototype.toRad = function() {
		   return this * Math.PI / 180;
		}

		var lat1 = coord1.latitude
		var lon1 = coord1.longitude
		var lat2 = coord2.latitude
		var lon2 = coord2.longitude

		var R = 6371000 // m 

		//has a problem with the .toRad() method below.
		var distanceLatitude = lat2 - lat1
		distanceLatitude = distanceLatitude.toRad()
		var distanceLongitude = lon2 - lon1
		distanceLongitude = distanceLongitude.toRad()

		var a = Math.sin(distanceLatitude/2) * Math.sin(distanceLatitude/2) + 
	          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	          Math.sin(distanceLongitude/2) * Math.sin(distanceLongitude/2)

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

		return R * c
	}

	// calculated time needed to arrive
	const calculateTimeNeeded = () => {
		var distance = haversine(positionHistory[0], positionHistory[positionHistory.length - 1])
		var time = positionHistory.length * intervalGetPosition
		var velocity = parseFloat(distance) / parseFloat(time) // m / sec

		var serviceCoord = {
			latitude: service.service_provider_id.latitude,
			longitude: service.service_provider_id.longitude
		}
		var distanceFromLocation = haversine(positionHistory[positionHistory.length - 1], serviceCoord) // in meter
		var timeRequiredToArrive = velocity > 0 ? (parseFloat(distanceFromLocation) / velocity) : null // in second

		console.log('velocity: '+velocity+' m / sec')
		console.log('distance to location: '+distanceFromLocation+' m')
		console.log('time required to arrive: ' + (timeRequiredToArrive == null ? 'not moving' : timeRequiredToArrive + 'second'))

		return {
			velocity: velocity,
			distance_from_loc: distanceFromLocation,
			time_arrival: timeRequiredToArrive
		}
	}

	// send and hold based on it's location
	const smartQueue = (data, predictedQueue) => {
		var isInsideOuter = data.distance_from_loc <= (service.service_provider_id.outer_distance * 1000)
		var isInsideInner = data.distance_from_loc <= (service.service_provider_id.inner_distance * 1000)

		// is inside inner distance
		if (isInsideInner) {
			console.log('inside inner')
			console.log('service_id: ' + service._id)
			console.log('queue_id: ' + (holdQueue !== null ? holdQueue._id : ''))

			var params = {
				service_id: service._id,
				queue_id: holdQueue !== null ? holdQueue._id : null
			}

			guestApi.post('/api/guest/queue/get-fixed', params).then(response => {
				if (response.data.statusCode == 200) {
					setHoldQueue (response.data.data.queue)
				} else {
					Alert.alert('Warning', response.data.message)
				}
			}, error => {
				console.log(error)
				Alert.alert('Warning!', error.message)
			})
		} else if (!isInsideInner && isInsideOuter) {
			console.log('inside outer')

			// is inside outer distance
			var params = {
				service_id: service._id,
				number_queue: predictedQueue,
				queue_id: holdQueue !== null ? holdQueue._id : null
			}
			var oldHoldQueue = holdQueue

			guestApi.post('/api/guest/queue/get-hold', params).then(response => {
				if (response.data.statusCode == 200) {
					// set to null if user move from inner to outer to recalculate
					if (oldHoldQueue !== null && oldHoldQueue.is_fixed) {
						setHoldQueue (null)
					} else {
						setHoldQueue (response.data.data.queue)
					}
				} else {
					Alert.alert('Warning', response.data.message)
				}
			}, error => {
				console.log(error)
				Alert.alert('Warning!', error.message)
			})
		}
	}

	// calculated by place
	const calculatedByPlace = () => {
		var data = calculateTimeNeeded()
		var predictedQueue = data.time_arrival / avgWaitingTime
		smartQueue(data, predictedQueue)
	}

	// calculated by time
	const calculatedByTime = (data) => {
		var bookedTime = new Date(service.booked_time)
		bookedTime = bookedTime.getTime()

		var currentTime = new Date()
		currentTime = currentTime.getTime()

		if (intervalChecker === null) {
			setIntervalChecker(Math.round(((bookedTime - currentTime) * 1000) / 5)) // in second
		}

		console.log('by time check interval: ' + intervalChecker)
		console.log('current different: ' + (bookedTime - currentTime))

		if ((bookedTime - currentTime) <= intervalChecker) {
			var data = calculateTimeNeeded()
			var predictedQueue = data.time_arrival / avgWaitingTime
			smartQueue(data, predictedQueue)
		}
	}

	// get position within 5 sec interval
	useEffect(() => {
		// set interval to get position get position every 1 minutes
		const intervalPosition = setInterval(() => {
			getPosition()
		}, (intervalGetPosition * 1000))

		return () => {
			clearInterval(intervalPosition)
		}
	})

	// calculate position
	useEffect(() => {
		console.log('position history :')
		console.log(positionHistory)

		if (positionHistory.length > 1) {
			console.log('average waiting time')
			console.log(avgWaitingTime)

			if (typeof service.booked_time == 'undefined') {
				console.log('in by place')
				calculatedByPlace()
			} else {
				console.log('in by time')
				calculatedByTime()
			}
			
		}
	}, [positionHistory])

	// save to storage when queue holder changed
	useEffect(() => {
		if (service !== null && holdQueue !== null) {
			AsyncStorage.setItem('hold_queue_' + service._id, JSON.stringify(holdQueue))
		}

		if (service !== null && holdQueue === null) {
			AsyncStorage.removeItem('hold_queue_' + service._id)
		}
	}, [holdQueue])

	// igonre yellow warning
	YellowBox.ignoreWarnings(['VirtualizedLists should never be nested'])

  return (

  	<SafeAreaView style={ styles.sav }>
	  	<ScrollView style={ styles.sv }>
		    <View style={ styles.container }>

		    	<View style={styles.queueContainer}>
		    		<Text style={styles.queueText}>Your number</Text>
		    		<Text style={styles.queue}>{ holdQueue !== null ? (holdQueue.code + holdQueue.number) : '-' }</Text>
		    		<Text style={styles.queueHelper}>Make sure you are around the area to get queue</Text>
		    	</View>

		  		<Text style={styles.totalWaiting}>Total waiting users : {totalWaitingUser}</Text>

		    	<View style={styles.waitingQueueContainer}>
		    		<Text style={styles.waitingQueueText}>Waiting users</Text>
		    		<FlatList
			    		nestedScrollEnabled={true}
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