import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { styles } from '@/styles/feed.styles'
import { Ionicons } from '@expo/vector-icons'
import { STORIES } from '@/constants/mock-data'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { COLORS } from '@/constants/theme'
import Loader from '@/components/Loader'
import Post from '@/components/Post'
import { StoryList } from '@/components/StoryList'

export default function Index() {
  const { signOut } = useAuth()
  const posts = useQuery(api.posts.getFeedPosts)

  if(posts === undefined) {
    return (
      <Loader />
    )
  }
  if(posts.length === 0) {
    return (
      <NoPostFound />
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>InstaApp</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

       {/* Posts */}
       <FlatList 
         data={posts}
         keyExtractor={(item) => item._id}
          renderItem={({item})=> (
            <Post post={item}/>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: 10,
          }}
          style={{
            marginTop: 10,
          }}
          ListHeaderComponent={<StoryList stories={STORIES} />}    
        />



    </View>
  )
}

const NoPostFound = () => {
  return(
    <View style={{
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background,
    }}>

      <Text style={{
        fontSize: 16,
        color: COLORS.primary,
      }}> No post yet</Text>

    </View>
  )
}