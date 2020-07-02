'use strict'

import React, { useState, useEffect } from 'react'
import { userApi } from '../component/CustomAxios'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements';

const CallQueue = ({ navigation, route }) => {
	const [loket, setLoket] = useState(null)
	const [totalWaitingUser, setTotalWaitingUser] = useState(0)
	const [currentNumber, setCurrentNumber] = useState(null)
	const [socket, setSocket] = useState(null)
	const [counter, setCounter] = useState(0)

	const repeatCall = () => {
		if (typeof loket._id !== 'undefined' && socket !== null) {
			console.log('call')
			var text = 'Nomor antrian. ' + currentNumber + '. Silahkan menuju ke ' + loket.name
			socket.send(JSON.stringify({url: '/queue/call', loket: loket._id, text: text}))
			setCounter(oldCounter => oldCounter + 1)
		}
	}

	const nextCall = () => {
		if (loket === null) {
			return
		}

		var params = {
			loket_id: loket._id
		}

		userApi.post('/api/user/queue/call', params).then(response => {
      var data = response.data
      var status = data.statusCode
      if (status != 200) {
      	Alert.alert('Warning!', data.message)
      }

      // reset counter on next
      setCounter(0)
    })
	}

	const unAssign = async () => {
		console.log('start un assign')
		var params = {
			assign_user_id: null 
		}

		await userApi.put('/api/user/loket/' + loket._id, params)
		console.log('done un assign')
	}

	// initial get loket
	useEffect(() => {
		setLoket(route.params.loket)
	}, [])

	// initial config websocket
	const initWs = () => {
		var host = url_ws + '/' + loket.service_provider_id
		var ws = new WebSocket(host)

		ws.onmessage = msg => {
			console.log(msg.data)
			var response = JSON.parse(msg.data)
			if (typeof response.data.url !== 'undefined') {
				var url = response.data.url

				// if last called
				if (url == '/queue/last-called') {
					if (typeof response.data.last_call !== 'undefined') {
						var lastCalledNumber = response.data.last_call
						console.log(lastCalledNumber)
						setCurrentNumber(lastCalledNumber)
					}
				}

				// get count
				if (url == '/queue/count') {
					if (typeof response.data.count_queue !== 'undefined') {
						setTotalWaitingUser(response.data.count_queue)
					}
				}

				// when receive new queue
				if (url == '/queue/new') {
					if (loket.service_id._id == response.data.queue.service_id) {
						// get last count
						ws.send(JSON.stringify({url: '/queue/count', service_id: loket.service_id._id}))
					}
				}

			}
		}

		ws.onopen = () => {
			if (typeof loket.service_id._id !== 'undefined') {
				ws.send(JSON.stringify({url: '/queue/last-called', service_id: loket.service_id._id, loket_id: loket._id}))
				ws.send(JSON.stringify({url: '/queue/count', service_id: loket.service_id._id}))
			}
		}

		setSocket(ws)
	}

	// initialize websocket
	useEffect(() => {
		// init websocket
		if (loket !== null) {
			initWs()
		}

		// on blur un assign first
		navigation.addListener('blur', () => {
    	if (loket !== null) {
    		unAssign()
    	}
    })
	}, [loket])

	// on socket changed
	useEffect(() => {
		return () => {
			// close websocket connection
			if (socket != null) {
				socket.close()
			}
		}
	}, [socket])

  return (
    <View style={styles.container}>

    	<View style={styles.card}>
    		<Text style={styles.cardHeader}>{loket !== null ? loket.name : ''}</Text>
    		<View style={styles.cardContent}>
    			<Text style={styles.number}>{currentNumber}</Text>
	    		<Text style={styles.totalWaitingUser}>{totalWaitingUser} more remaining</Text>
    		</View>
    		<View style={styles.cardFooter}>
    			<TouchableOpacity disabled={currentNumber == '-' || counter > 2} onPress={() => repeatCall()} >
    				<Icon
    					name='volume-up'
    					type='FontAwesome5'
    					color='#fff'
    					size={30}
    					style={styles.repeatBtn}
    				/>
    			</TouchableOpacity>
    			<TouchableOpacity disabled={totalWaitingUser == 0} onPress={() => nextCall()} >
    				<Icon
    					name='forward'
    					color='#fff'
    					size={30}
    					style={styles.nextBtn}
    				/>
    			</TouchableOpacity>
    		</View>
    	</View>

    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		width: 350,
		borderWidth: 1,
		borderColor: '#A7A7A7',
		padding: 20
	},
	cardHeader: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: '600',
		marginBottom: 20,
	},
	cardContent: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 35,
	},
	number: {
		fontSize: 50,
		fontWeight: 'bold',
		color: '#43CAFF'
	},
	totalWaitingUser: {
		fontSize: 20,
		color: '#828282'
	},
	repeatBtn: {
		marginBottom: 15,
		padding: 15,
		backgroundColor: '#43CAFF',
		borderRadius: 20
	},
	nextBtn: {
		marginBottom: 15,
		padding: 15,
		backgroundColor: '#53DC44',
		borderRadius: 20
	}
})

export default CallQueue