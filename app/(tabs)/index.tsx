import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

export default function Index() {
  const {signOut} = useAuth()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
  )
}