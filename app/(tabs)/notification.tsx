import { View, Text, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { styles } from '@/styles/notification.styles'
import NotificationItem from '@/components/NotificationItem'
import { Ionicons } from '@expo/vector-icons'

export default function NotificationScreen() {

  const notifications = useQuery(api.notification.getNotification)

  if (notifications === undefined) return <Loader />

  if (notifications.length === 0) return <EmptyNotification />

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <NotificationItem notification={item}/>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}

      />

    </View>
  )
}

const EmptyNotification = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background
    }}>
      <Ionicons name='notifications-outline' size={24} color={COLORS.white} />
      <Text style={{
        fontSize: 16,
        fontWeight: '300',
        color: COLORS.grey,
        marginTop: 5
      }}>No Notifciations yet</Text>
    </View>
  )
}