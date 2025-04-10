import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { Image } from 'expo-image'
import { styles } from '@/styles/feed.styles'

export default function BookmarkScreen() {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarks)

  if (bookmarkedPosts === undefined) return <Loader />

  if (bookmarkedPosts.length === 0) {
    return (
      <NoBookeMarked />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bookmarks</Text>
      </View>

      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item, index) => item?._id.toString() ?? `null-item-${index}`}
        renderItem={({ item }) => (
          item ? (
            <View style={{
              width: "33.33%",
              padding: 2,
            }}>
              <Image
                source={{ uri: item?.imageUrl }}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                contentFit='cover'
                transition={2000}
                cachePolicy={'memory-disk'}
              />
            </View>
          ) : null
        )}
        numColumns={3}
      />
    </View>
  )
}

const NoBookeMarked = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '300',
        color: COLORS.grey,
      }}>No Bookmarked Posts</Text>
    </View>
  )
}