'use strict'

import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert
} from 'react-native'
import { Button } from 'react-native-elements'

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = () => {
		var params = {
			username: username,
			password: password
		}

		axios.post(url + '/api/login', params).then(async response => {
			if (response.data.statusCode == 200) {
				Alert.alert('Success!', response.data.message)

				// save token into async storage
				await AsyncStorage.setItem('token', response.data.data.token)
				setTimeout(() => {
					navigation.navigate('AdminDrawer')
				}, 400)
			} else {
				Alert.alert('Warning!', response.data.message)
			}
		}, error => {
			Alert.alert('Warning!', error.message)
		})
		
	}

	// const { signIn } = useContext(AuthContext);

  return (
    <View style={ styles.container }>

    		<Text style={styles.loginText}>Login Form</Text>
    		<Text style={styles.loginDesc}>Please login first before using our feature</Text>
    		<TextInput 
    			style={styles.usernameInput}
    			onChangeText={text => setUsername(text)}
    			value={username}
    			placeholder={'Username'}
    		/>
    		<TextInput 
    			style={styles.passwordInput}
    			onChangeText={text => setPassword(text)}
    			value={password}
    			placeholder={'Password'}
    			secureTextEntry={true}
    		/>
    		<Button 
    			buttonStyle={ styles.loginBtn }
    			title="Login"
    			onPress={ () => login() } 
  			/>

    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		fontSize: 25,
		fontWeight: '600',
		color: '#43CAFF',
		marginBottom: 10,
	},
	loginDesc: {
		fontSize: 16,
		color: '#9E9E9E',
		marginBottom: 20,
	},
	usernameInput: {
		borderWidth: 1,
		borderColor: '#C0C2BF',
		width: 300,
		padding: 15,
		fontSize: 16,
		marginBottom: 15,
	},
	passwordInput: {
		borderWidth: 1,
		borderColor: '#C0C2BF',
		width: 300,
		padding: 15,
		fontSize: 16,
		marginBottom: 20,
	},
	loginBtn: {
		width: 300,
		backgroundColor: '#43CAFF',
	},
})

export default Login