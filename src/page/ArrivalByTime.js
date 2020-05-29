'use strict'

import React, { useState } from 'react'

import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { Button } from 'react-native-elements';

import moment from 'moment-timezone'
import DateTimePicker from '@react-native-community/datetimepicker'

const ArrivalByTime = ({ navigation, route }) => {
	const [date, setDate] = useState( new Date() )
  const [show, setShow] = useState(Platform.OS === 'ios' ? true : false)
  const minDate = new Date()
  const maxDate = moment().endOf('day').toDate()

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')

    if (Platform.OS === 'android') {
    	// restrict only limited time allowed
    	if (currentDate < minDate) {
    		setDate(minDate)
    	} else if (currentDate > maxDate) {
    		setDate(maxDate)
    	} else {
    		setDate(currentDate)
    	}

    // when platform is not android
    } else {
    	setDate(currentDate)
    }
	}

	const showTimePicker = () => {
    setShow(true)
  };

  const getQueue = () => {
  	navigation.navigate('Queue', {services: route.params.services})
  }

  return (
    <View style={ styles.container }>
    	
    	{!show && (
    		<View style={styles.timeReservedContainer}>
    			<Text style={ styles.textTimeReserved } >
    				Reserved at : {"\n"}
    				<Text style={styles.innerText}>
    				  { moment(date).format('HH:mm') }
    				</Text>
    			</Text>
	    		<Button 
	    			containerStyle={ styles.btnContainer }
	    			buttonStyle={ styles.btn }
	    			title="Change Time"
	    			onPress={ () => showTimePicker() } 
	    			/>
    		</View>
    	)}

    	{show && (
	    	<View>
	    		<Text style={ styles.iosArrivalText }>Select Time of Your Arrival</Text>
	    		<DateTimePicker
	    			textColor={'#43CAFF'}
		        value={date}
		        minimumDate={minDate}
		        maximumDate={maxDate}
		        mode={'time'}
		        is24Hour={true}
		        display="default"
		        onChange={(event, selectedDate) => onChange(event, selectedDate)}
		    	/>
	    	</View>
    	)}

    	<Button
    		containerStyle={ styles.btnContainer }
    		buttonStyle={ styles.btn } 
    		title="Get Queue" 
    		onPress={ () => getQueue() } 
    		/>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		justifyContent: 'center'
	},
	timeReservedContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	textTimeReserved: {
		textAlign: 'center',
		fontSize: 16,
		backgroundColor: '#5475ED',
		padding: 40,
		borderRadius: 70,
		width: 150,
		color: '#fff'
	},
	innerText: {
		fontWeight: 'bold',
		fontSize: 20
	},
	iosArrivalText: {
		textAlign: 'center',
		fontSize: 18,
		color: '#43CAFF'
	},

	// get queue button
	btnContainer: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		width: 300,
		borderRadius: 15,
		backgroundColor: '#43CAFF'
	}
})

export default ArrivalByTime