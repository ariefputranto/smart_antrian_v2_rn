import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import axios from 'axios'

// route
import UserDrawer from '../routes/UserDrawer'
import AdminDrawer from '../routes/AdminDrawer'

const Drawer = createDrawerNavigator()

const AuthStack = ({ navigation, route }) => {
	const [isLogin, setLogin] = useState(false)
	const [isAdminLogin, setAdminLogin] = useState(false)

	useEffect(() => {
		if (typeof route !== 'undefined' && route.params?.isLogin) {
			setLogin(route.params.isLogin)
		}

		console.log(isLogin)
	}, [])

	return (
		<NavigationContainer>
	      <Drawer.Navigator>
	        <Drawer.Screen name="UserDrawer" component={UserDrawer} options={{ title: 'User Page' }} />
					<Drawer.Screen name="AdminDrawer" component={AdminDrawer} options={{ title: 'Admin Page', 'swipeEnabled': false }} />
	      </Drawer.Navigator>
    </NavigationContainer>
	)
}

export default AuthStack