import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/notification.styles'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { formatDistanceToNow } from 'date-fns'


export default function NotificationItem({notification}: any) {
    { console.log(notification.sender) }
    return (
        <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
                <Link href={`/(tabs)/notification`}>
                    <TouchableOpacity
                        style={styles.avatarContainer}>
                        <Image
                            source={notification.sender.image}
                            style={styles.avatar}
                            contentFit='cover'
                            transition={200}
                        />
                        <View style={styles.iconBadge}>
                            {
                                notification.type === "like" ? (
                                    <Ionicons name="heart" size={14} color={COLORS.primary} />
                                ) : notification.type === "follow" ? (
                                    <Ionicons name="person-add" size={14} color={"#8B5CF6"} />
                                ) : (
                                    <Ionicons name='chatbubble' size={14} color={'#3B82F6'} />
                                )
                            }

                        </View>
                    </TouchableOpacity>

                </Link>

                <View style={styles.notificationInfo}>
                    <Link href={`/(tabs)/notification`} asChild>
                        <TouchableOpacity>
                            <Text style={styles.username}>{notification.sender.username}</Text>
                        </TouchableOpacity>
                    </Link>
                    <Text style={styles.action}>
                        {
                            notification.type === "follow"
                                ? "start following you"
                                : notification.type === "like"
                                    ? "like your post"
                                    : `commented: "${notification.comment}"`
                        }

                    </Text>
                    <Text style={styles.timeAgo}>
                        {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
                    </Text>



                </View>
                {
                    notification.post && (
                        <Image
                            source={notification.post.imageUrl}
                            style={styles.postImage}
                            contentFit='cover'
                            transition={200}
                            cachePolicy={'memory-disk'}
                        />
                    )
                }
            </View>
        </View>
    )
}