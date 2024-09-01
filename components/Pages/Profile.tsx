import { View, Text } from 'react-native'
import React from 'react'
import LogoutButton from './LogoutButton'

export default function Profile() {
  return (
    <View>
      <LogoutButton/>
      <Text>Profile</Text>
    </View>
  )
}