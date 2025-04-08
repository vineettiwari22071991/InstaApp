import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx</Text>
      <Link href="/profile">
        <Text style={{ color: "blue" }}>Go to Profile</Text>
      </Link>
      <Link href="/notification">
        <Text style={{ color: "blue" }}>Go to Notification</Text>
      </Link>
    </View>
  )
}