import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CommentView = ({ comments }: any) => {
    if (!comments || !comments.items || comments.items.length === 0) {
        return (
            <Text>No comments available</Text>
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <FlatList
                    data={comments.items} // Assuming 'comments' is an object with an 'items' property
                    keyExtractor={(comment) => comment.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentAuthor}>
                                {item.user.fullName} {/* Display the author's full name */}
                            </Text>
                            <Text style={styles.commentText}>{item.content}</Text> {/* Display the comment content */}
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    commentContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    commentAuthor: {
        fontWeight: 'bold',
        marginBottom: 6,
    },
    commentText: {
        fontSize: 16,
    },
});

export default CommentView;
