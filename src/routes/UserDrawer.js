import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

// page
import NewUserQueueStack from './NewUserQueueStack'
import ResumeUserQueueStack from './ResumeUserQueueStack'
import Login from '../page/Login'
import CallQueue from '../page/CallQueue'
import Loket from '../page/Loket'

const Drawer = createDrawerNavigator()

const UserDrawer = ({ navigation, route }) => {
	const [isLogin, setLogin] = React.useState(false)

	React.useEffect(() => {
		if (typeof route !== 'undefined' && route.params?.isLogin) {
			setLogin(route.params.isLogin)
		}

		console.log(isLogin)
	}, [])

	return (
		<NavigationContainer>
      {	isLogin ? (
	      <Drawer.Navigator>
					<Drawer.Screen name="Loket" component={Loket} options={{ title: 'Change Loket' }} />
		      <Drawer.Screen name="CallQueue" component={CallQueue} options={{ title: 'Call Queue' }} />
	      </Drawer.Navigator>
			) : (
	      <Drawer.Navigator>
					<Drawer.Screen name="NewUserQueueStack" component={NewUserQueueStack} options={{ title: 'New Queue' }} />
	        <Drawer.Screen name="ResumeUserQueueStack" component={ResumeUserQueueStack} options={{ title: 'Resume Queue' }} />
	        <Drawer.Screen name="Login" component={Login} options={{ title: 'Login' }} />
	      </Drawer.Navigator>
			)}
    </NavigationContainer>
	)
}

export default UserDrawer