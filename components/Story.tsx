import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { styles } from '@/styles/feed.styles'
import { Image } from 'expo-image'
import isEqual from "fast-deep-equal/react";

type Story = {
    id: string,
    username: string,
    avatar: string,
    hasStory: boolean,
}

function StoryComponent({ story }: { story: Story }) {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={story.hasStory ? styles.storyRing : styles.noStoryRing}>
        <Image
          source={{ uri: story.avatar }}
          style={styles.storyAvatar}
          contentFit="cover"
        />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  )
}

// 👇 Memoize it to avoid re-rendering unless the story actually changes
export default memo(StoryComponent, (prevProps, nextProps) => {
  return isEqual(prevProps.story, nextProps.story)
})
