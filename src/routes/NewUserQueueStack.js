import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// page
import ServicesProvider from '../page/ServicesProvider'
import Services from '../page/Services'
import ServicesMethod from '../page/ServicesMethod'
import ArrivalByTime from '../page/ArrivalByTime'
import Queue from '../page/Queue'

const Stack = createStackNavigator()

const NewUserQueueStack = () => {
	return (
    <Stack.Navigator screenOptions={ options.default } >
      <Stack.Screen name="ServicesProvider" component={ServicesProvider} options={ options.servicesProvider } />
      <Stack.Screen name="Services" component={Services} options={ options.services } />
      <Stack.Screen name="ServicesMethod" component={ServicesMethod} options={ options.servicesMethod } />
      <Stack.Screen name="ArrivalByTime" component={ArrivalByTime} options={ options.arrivalByTime } />
      <Stack.Screen name="Queue" component={Queue} />
    </Stack.Navigator>
	)
}

const options = {
	default: { 
		headerStyle: {
			backgroundColor: '#43CAFF'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		},
		headerBackTitle: 'Back', 
	},
	servicesProvider: {
		title: 'Smart Antrian'
	},
	services: ( {route} ) => ({ 
		title: route.params.service_provider.name 
	}),
	servicesMethod: ({route} ) => ({ 
		title: route.params.services.name 
	}),
	arrivalByTime: {
		title: 'Arrival by Time',
	}
}

export default NewUserQueueStack