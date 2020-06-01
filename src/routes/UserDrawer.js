import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// page
import NewUserQueueStack from './NewUserQueueStack'
import ResumeUserQueueStack from './ResumeUserQueueStack'
import Login from '../page/Login'

const Drawer = createDrawerNavigator()

const UserDrawer = () => {
	return (
    <Drawer.Navigator>
			<Drawer.Screen name="NewUserQueueStack" component={NewUserQueueStack} options={{ title: 'New Queue' }} />
      <Drawer.Screen name="ResumeUserQueueStack" component={ResumeUserQueueStack} options={{ title: 'Resume Queue' }} />
      <Drawer.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Drawer.Navigator>
	)
}

export default UserDrawer