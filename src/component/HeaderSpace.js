'use strict'

import React from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

const HeaderSpace = (props) => {
  return (
    <View style={styles.header}/>
  )
}

const styles = StyleSheet.create({
	header: {
		height: Platform.OS === 'ios' ? 45 : 0
	},
})

export default HeaderSpace