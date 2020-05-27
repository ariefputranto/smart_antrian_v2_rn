'use strict'

import React, { useState } from 'react'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements';

const CallQueue = (props) => {
	const repeatCall = () => {
		alert('repeat call button is clicked')
	}

	const nextCall = () => {
		alert('next call button is clicked')
	}

  return (
    <View style={styles.container}>

    	<View style={styles.card}>
    		<Text style={styles.cardHeader}>Loket 1</Text>
    		<View style={styles.cardContent}>
    			<Text style={styles.number}>A10</Text>
	    		<Text style={styles.totalWaitingUser}>10 more remaining</Text>
    		</View>
    		<View style={styles.cardFooter}>
    			<TouchableOpacity onPress={() => repeatCall()} >
    				<Icon
    					name='autorenew'
    					color='#fff'
    					size={30}
    					style={styles.repeatBtn}
    				/>
    			</TouchableOpacity>
    			<TouchableOpacity onPress={() => nextCall()} >
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