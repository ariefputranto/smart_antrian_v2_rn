import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

// page
import CallQueue from '../page/CallQueue'
import Loket from '../page/Loket'

const Stack = createStackNavigator()

const AdminDrawer = ({ navigation }) => {
	const logout = () => {
		navigation.navigate('UserDrawer')
	}

	return (
    <Stack.Navigator screenOptions={ styles.screenOptions }>
			<Stack.Screen name="Loket" component={Loket} options={{ title: 'Change Loket', headerLeft: () => (
        <TouchableOpacity onPress={() => logout()} style={{ marginLeft: 10 }}>
        	<Icon
		        name='logout'
		        size={ 30 }
		        color='#fff'
		        type='material-community' />
        </TouchableOpacity>
      ) }} />
      <Stack.Screen name="CallQueue" component={CallQueue} options={{ title: 'Call Queue' }} />
    </Stack.Navigator>
	)
}

const styles = {
	screenOptions: {
		headerStyle: {
			backgroundColor: '#43CAFF'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		},
		headerBackTitle: 'Back'
	}
}

export default AdminDrawer