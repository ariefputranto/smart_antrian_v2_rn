'use strict';

import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { userApi } from '../component/CustomAxios'

import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Alert
} from 'react-native'

const Loket = ({ navigation }) => {
	const [loket, setLoket] = useState([])
	const [user, setUser] = useState(null)
	const [isAssign, setIsAssign] = useState(null)

	const getLoket = () => {
		console.log('start assign')
		userApi.get('/api/user/loket').then(response => {
			setLoket(response.data.data)
			console.log('done assign')
		}, error => {
			Alert.alert('Warning!', error.message)
		})
	}

	const getUser = async () => {
		userApi.get('/api/user').then(response => {
			setUser(response.data.data)
		}, error => {
			Alert.alert('Warning!', error.message)
		})
	}

	const getCurrentStatus = () => {
		userApi.get('/api/user/loket/check-assigned-user').then(response => {
			setIsAssign(response.data.data)
		}, error => {
			Alert.alert('Warning!', error.message)
		})
	}

	useEffect(() => {
		navigation.addListener('focus', () => {
      setTimeout(() => {
      	getLoket()
      }, 500)
    })
		getCurrentStatus()
	}, [])

	useEffect(() => {
    if (isAssign === null) {
    	getLoket()
			getUser()
    } else {
    	navigation.navigate('CallQueue', {loket: isAssign})
    }
	}, [isAssign])

	const assignUser = (loket) => {
		var params = {
			assign_user_id: user._id 
		}

		userApi.put('/api/user/loket/' + loket._id, params).then(response => {
			console.log('response assign user')
			console.log(response.data)
		}, error => {
			Alert.alert('Warning!', error.message)
		})
	}

	const clickHandler = (item) => {
		assignUser(item)
		navigation.navigate('CallQueue', {loket: item})
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
		    			<TouchableOpacity onPress={ () => clickHandler(item) }>
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