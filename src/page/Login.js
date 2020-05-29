'use strict'

import React, { useState } from 'react'

import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import { Button } from 'react-native-elements';

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = () => {
		alert('login button clicked')
	}

  return (
    <View style={ styles.container }>

    		<Text style={styles.loginText}>Login Form</Text>
    		<Text style={styles.loginDesc}>Please login first before using our feature</Text>
    		<TextInput 
    			style={styles.usernameInput}
    			onChange={text => setUsername(text)}
    			value={username}
    			placeholder={'Username'}
    		/>
    		<TextInput 
    			style={styles.passwordInput}
    			onChange={text => setPassword(text)}
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