import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { memo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import isEqual from "fast-deep-equal/react";
import CommentsModal from "./CommentsModal";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-expo";

type PostProps = {
    post: {
        _id: Id<"posts">,
        imageUrl: string,
        caption?: string,
        likes: number,
        comments: number,
        _creationTime: number,
        isLiked: boolean,
        isBookmarked: boolean,
        author: {
            _id: string,
            username: string,
            image: string,
        }
    }
}

function Post({ post }: PostProps) {
    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likesCount, setLikesCount] = useState(post.likes)
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)

    const { user } = useUser()

    const currentUser = useQuery(api.users.getUserByClerkId, user ? { clerkId: user.id } : "skip")

    const [commentsCount, setCommentsCount] = useState(post.comments)
    const [showComments, setShowComments] = useState(false)

    const toggleLike = useMutation(api.posts.toggleLike)
    const toggleBookmark = useMutation(api.bookmarks.toggleBookmark)
    const deletePost = useMutation(api.posts.deletePost)

    const handleLike = async () => {
        try {
            const newIsLiked = await toggleLike({ postId: post._id })
            setIsLiked(newIsLiked)
            setLikesCount((prev) => newIsLiked ? prev + 1 : prev - 1)
        } catch (error) {
            console.log("Error liking post: ", error)
        }
    }

    const handleBookmark = async () => {
        const newIsBookmarked = await toggleBookmark({ postId: post._id })
        setIsBookmarked(newIsBookmarked)
    }

    const handleDeletePost = async () => {
        try {
            await deletePost({ postId: post._id })
        } catch (error) {
            console.log("Error deleting post: ", error)
        }
    }
    return (
        <View style={styles.post}>
            {/* Post Header */}
            <View style={styles.header}>

                <Link href={"/(tabs)/notification"}
                >
                    <View style={styles.postHeaderLeft}>
                        <Image
                            source={{ uri: post?.author?.image }}
                            style={styles.postAvatar}
                            contentFit="cover"
                            transition={2000}
                            cachePolicy={"memory-disk"}
                        />
                        <Text style={styles.postUsername}>{post?.author?.username}</Text>
                    </View>


                </Link>

                {
                    post?.author?._id !== currentUser?._id ? (
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleDeletePost}>
                            <Ionicons name="trash-outline" size={20} color={COLORS.white} />
                        </TouchableOpacity>

                    )

                }

            </View>

            {/* Post Image */}
            <Image
                source={post?.imageUrl}
                style={styles.postImage}
                contentFit="cover"
                transition={2000}
                cachePolicy={"memory-disk"}
            />
            {/* Post Actions */}
            <View style={styles.postActions}>
                <View style={styles.postActionsLeft}>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name={
                            isLiked ? "heart" : "heart-outline"
                        } size={24}
                            color={isLiked ? "red" : COLORS.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowComments(true)}>
                        <Ionicons name="chatbubble-outline" size={22} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleBookmark}>
                    <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={22}
                        color={isBookmarked ? COLORS.primary : COLORS.white} />
                </TouchableOpacity>
            </View>

            {  /* Post Info */}
            <View style={styles.postInfo}>
                <Text style={styles.likesText}>{
                    likesCount > 0 ? `${likesCount} likes` : "Be the first to like"
                }</Text>
                {
                    post?.caption && (
                        <View style={styles.captionContainer}>
                            <Text style={styles.captionUsername}>{post?.author?.username}</Text>
                            <Text style={styles.captionText}>{post?.caption}</Text>
                        </View>
                    )
                }
                <TouchableOpacity onPress={() => setShowComments(true)}>
                    {
                        commentsCount > 0 ? (
                            <Text style={styles.commentsText}>View all {commentsCount} comments</Text>
                        ) :
                            <Text style={styles.commentsText}>No comments yet</Text>
                    }

                </TouchableOpacity>
                <Text style={styles.timeAgo}>{
                    formatDistanceToNow(post._creationTime, {
                        addSuffix: true,
                        includeSeconds: true,
                    })
                }</Text>

            </View>
            {/* Post Comments */}
            <CommentsModal
                postId={post._id}
                visible={showComments}
                onClose={() => setShowComments(false)}
                onCommentAdded={() => {
                    setCommentsCount((prev) => prev + 1)
                }}
            />

        </View>
    )
}

export default memo(Post, (prevPros, nextProps) => {
    return isEqual(prevPros.post, nextProps.post)
})