import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/feed.styles'
import { Image } from 'expo-image'

type Story = {
    id: string,
    username: string,
    avatar: string,
    hasStory: boolean,
}

export default function Story({story}: {story: Story}) {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
        <View style={story.hasStory ? styles.storyRing : styles.noStoryRing}>
            <Image
            source={{uri: story.avatar}}
            style={styles.storyAvatar}
            contentFit="cover"
            transition={1000}
            />
        </View>
        <Text style={styles.storyName} numberOfLines={1}>{story.username}</Text>
    </TouchableOpacity>
  )
}