import { View, Text, Modal, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { styles } from '@/styles/feed.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import Loader from './Loader'
import Comment from './Comment'

type CommentsModalProps = {
    postId: Id<"posts">,
    visible: boolean,
    onClose: () => void,
    onCommentAdded: () => void,
}

export default function CommentsModal({ postId, visible, onClose, onCommentAdded }: CommentsModalProps) {
    const [newComment, setNewComment] = useState<string>("")
    const comments = useQuery(api.comments.getComments, { postId })
    const addComment = useMutation(api.comments.addComment)

    const handleAddComment = async () => { 

        if (newComment.trim() === "") return
        try {
            await addComment({ postId, content: newComment })
            setNewComment("")
            onCommentAdded()
        } catch (error) {
            console.log("Error adding comment: ", error)
        }
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
                        <Ionicons name='close' size={22} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.modelHeadeText}>Comments</Text>
                    <View style={{ width: 24 }} />
                </View>

                {
                    comments === undefined ? (
                        <Loader />
                    ) : (
                        <FlatList
                            data={comments}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) =>
                                <Comment comment={item} />
                            }
                            contentContainerStyle={styles.commentsList}
                            ListEmptyComponent={() => (
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name='chatbubble-ellipses-outline' size={24} color={COLORS.grey} />
                                    <Text style={{
                                        fontSize: 16,
                                        color: COLORS.white,
                                        marginTop: 8
                                    }}>No comments yet</Text>
                                </View>
                            )}
                        />
                    )
                }
                <View style={styles.commentInput}>

                    <TextInput
                        style={styles.input}
                        placeholder='Add a comment'
                        placeholderTextColor={COLORS.grey}
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                    />

                    <TouchableOpacity
                        onPress={handleAddComment}
                        disabled={!newComment.trim()}
                    >
                        <Text style={[
                            styles.postButton,
                            !newComment.trim() && styles.postButtonDisabled
                        ]}>
                            Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </Modal>
    )
}