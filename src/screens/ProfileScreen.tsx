import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/user.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>@tiktokuser</Text>
                <Text style={styles.bio}>This is my bio</Text>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>1000</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>500</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>200</Text>
                    <Text style={styles.statLabel}>Likes</Text>
                </View>
            </View>
            <View style={styles.postsContainer}>
                {/* Hiển thị các bài đăng */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Đổi màu nền thành màu đen
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff', // Đổi màu chữ thành màu trắng
    },
    bio: {
        fontSize: 16,
        color: '#fff', // Đổi màu chữ thành màu trắng
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    stat: {
        alignItems: 'center',
    },
    statCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Đổi màu chữ thành màu trắng
    },
    statLabel: {
        fontSize: 16,
        color: '#fff', // Đổi màu chữ thành màu trắng
    },
    postsContainer: {
        flex: 1,
        padding: 20,
    },
});

export default ProfileScreen;