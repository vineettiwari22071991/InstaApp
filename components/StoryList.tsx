// StoryList.tsx
import React, { memo } from 'react'
import { FlatList } from 'react-native'
import Story from './Story'

type Story = {
  id: string,
  username: string,
  avatar: string,
  hasStory: boolean,
}

type Props = {
  stories: Story[]
}

function StoryListComponent({ stories }: Props) {
  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <Story story={item} />}
    />
  )
}

export const StoryList = memo(StoryListComponent)
