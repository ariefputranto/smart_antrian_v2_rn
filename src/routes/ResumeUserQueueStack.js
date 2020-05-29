import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// page
import ServicesProvider from '../page/ServicesProvider'
import Services from '../page/Services'
import Queue from '../page/Queue'

const Stack = createStackNavigator()

const ResumeUserQueueStack = () => {
	return (
    <Stack.Navigator screenOptions={ options.default } >
      <Stack.Screen name="ServicesProvider" component={ServicesProvider} options={ options.servicesProvider } initialParams={{isResume: true}} />
      <Stack.Screen name="Services" component={Services} options={ options.services } />
      <Stack.Screen name="Queue" component={Queue} options={ options.queue } />
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
}

export default ResumeUserQueueStack