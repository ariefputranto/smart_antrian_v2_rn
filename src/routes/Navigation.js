import React, { useState, useEffect, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

// element
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

// route
import InitialLoading from '../page/InitialLoading'
import CallQueue from '../page/CallQueue'
import Loket from '../page/Loket'
import Login from '../page/Login'
import ServicesProvider from '../page/ServicesProvider'
import Services from '../page/Services'
import ServicesMethod from '../page/ServicesMethod'
import ArrivalByTime from '../page/ArrivalByTime'
import Queue from '../page/Queue'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const Navigation = () => {
  const [token, setToken] = useState(null)

  const getToken = async () => {
    var currentToken = await AsyncStorage.getItem('token')
    setToken(currentToken)
  }

  const NavigationDrawer = () => {
    // if user
    if (token !== null) {
      return (
        <Drawer.Navigator>
          <Drawer.Screen name="AdminDrawer" component={AdminDrawer} options={{ title: 'Admin Page', 'swipeEnabled': false }} />
          <Drawer.Screen name="UserDrawer" component={UserDrawer} options={{ title: 'User Page' }} />
        </Drawer.Navigator>
      )

    // if guest
    } else {
      return (
        <Drawer.Navigator>
          <Drawer.Screen name="UserDrawer" component={UserDrawer} options={{ title: 'User Page' }} />
          <Drawer.Screen name="AdminDrawer" component={AdminDrawer} options={{ title: 'Admin Page', 'swipeEnabled': false }} />
        </Drawer.Navigator>
      )
    }
  }

  useEffect(() => {
    getToken()
  }, [])

	return (
		<NavigationContainer>
      <NavigationDrawer />
		</NavigationContainer>
	)
}

const AdminDrawer = ({ navigation }) => {
  const signOut = async () => {
    await AsyncStorage.removeItem('token')
    navigation.navigate('UserDrawer')
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

  return (
    <Stack.Navigator screenOptions={ styles.screenOptions }>
      <Stack.Screen name="Loket" component={Loket} options={{ title: 'Change Loket', headerLeft: () => (
        <TouchableOpacity onPress={() => signOut()} style={{ marginLeft: 10 }}>
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

const UserDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="NewUserQueueStack" component={NewUserQueueStack} options={{ title: 'New Queue' }} />
      <Drawer.Screen name="ResumeUserQueueStack" component={ResumeUserQueueStack} options={{ title: 'Resume Queue' }} />
      <Drawer.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Drawer.Navigator>
  )
}

const NewUserQueueStack = () => {
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

const ResumeUserQueueStack = () => {
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

  return (
    <Stack.Navigator screenOptions={ options.default } >
      <Stack.Screen name="ServicesProvider" component={ServicesProvider} options={ options.servicesProvider } initialParams={{isResume: true}} />
      <Stack.Screen name="Services" component={Services} options={ options.services } />
      <Stack.Screen name="Queue" component={Queue} options={ options.queue } />
    </Stack.Navigator>
  )
}

export default Navigation