import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useAuth } from '../authentication/AuthContext';
import axios from 'axios';

const ProfileScreen = () => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
    const [user, setUser]: any = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const openLoginForm = () => {
        setEmailError("");
        setPasswordError("");
        setIsLoginFormVisible(true);
    };
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const menuItems = ['Update', 'Log out'];

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleMenuItemClick = (menuItem: any) => {
        setSelectedItem(menuItem);
        setDropdownVisible(false);
        // Call your function or perform any other action with the selected item here
        console.log(`Selected: ${menuItem}`);
        if (menuItem == 'Log out') {
            console.log('Log out');
            setUser(null);
        }
        if (menuItem == 'Update') {
            console.log('Update');
        }
    };

    const handleLogin = () => {
        console.log("Begin login")
        setEmailError("");
        setPasswordError("");
        if (!email) {
            setEmailError("Email is required");
            console.log("Email is not required");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            console.log("Password is required");
            return;
        }
        axios({
            method: "POST",
            url: "https://ocean-apis.onrender.com/api/auth/login",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                password: password,
            },
        }).then((res) => {
            console.log("login successful")
            setUser({ ...res.data });
            console.log(res.data, user);
        }).catch((e) => {
            console.log(e.message);
            setEmailError("Invalid email or password");
        }).finally(() => {
        });
    };
    const closeLoginForm = () => {
        setIsLoginFormVisible(false);
    };
    if (!user) {
        return (
            <View style={style.container}>
                <View style={style.logoContainer}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={style.logo}
                    />
                </View>
                <View style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Welcome to Digital Ocean</Text>
                    <Text>   It's the place where real connections happen.
                        No need to follow a script or build a persona – you do you. Share your world through photos, videos, and words, and discover what inspires you.
                        Join us at SocialScape and let's create something extraordinary together!</Text>
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity style={style.button} onPress={openLoginForm}>
                        <Text style={{ fontSize: 25, color: 'white' }}>Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttonRegister}>

                        <Text style={{ fontSize: 25, color: 'white' }}>Register +</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isLoginFormVisible}
                    onRequestClose={closeLoginForm}
                >
                    {/* Render your Login component as a modal */}
                    <View style={style.modalContainer}>
                        <View style={style.modelSigin}>
                            <Image source={require('../assets/images/logo.png')} style={{ resizeMode: 'contain', width: '60%', marginLeft: 55 }}></Image>
                            <Text style={{ fontSize: 40, color: '#000', paddingLeft: 40 }}>Login Ocean</Text>
                            <View >
                                <View>
                                    <Text style={{ color: 'red' }}>{emailError}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', marginTop: 15, marginLeft: 20, fontSize: 15, marginRight: 30 }}>
                                        Email:
                                    </Text>
                                    <TextInput
                                        style={style.textSignin}
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                                <View>
                                    <Text style={{ color: 'red' }}>{passwordError}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', marginTop: 15, marginLeft: 20, fontSize: 15 }}>
                                        Password:
                                    </Text>
                                    <TextInput
                                        style={style.textSignin}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={true}
                                    />
                                </View>

                            </View>
                            <View style={{ width: '80%', borderRadius: 20, marginHorizontal: 30, padding: 10 }}>
                                <Button title='Login' onPress={handleLogin} />
                            </View>

                        </View>
                        <TouchableOpacity onPress={closeLoginForm}>
                            <Text style={style.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal >
            </View >

        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/user.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>@tiktokuser</Text>
                <Text style={styles.bio}>This is my bio</Text>
                <View>
                    <TouchableOpacity style={styles1.dropdownButton} onPress={toggleDropdown}>
                        <Text style={styles1.buttonText}>
                            More option [ V ]
                        </Text>
                    </TouchableOpacity>

                    {isDropdownVisible && (
                        <View style={styles1.dropdownContainer}>
                            {menuItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles1.menuItem}
                                    onPress={() => handleMenuItemClick(item)}
                                >
                                    <Text style={styles1.menuItemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

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

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownButton: {
        backgroundColor: '#0096FF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    dropdownContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemText: {
        fontSize: 16,
        color: 'black',
    },
});

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textSignin: {
        height: 40,
        width: '60%',
        color: 'black',
        borderWidth: 2,
        borderColor: 'black',
        margin: 5,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    modelSigin: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 20,
        justifyContent: 'center',
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 40,
        width: 100,
        paddingTop: 5,
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {

        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 200,
        borderRadius: 5,
        backgroundColor: 'black',
        resizeMode: 'contain'
    },
    buttonContainer: {
        marginTop: 50,
        marginHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#0096FF',
        margin: 10,
        height: 50,
        color: 'white',
    },
    buttonRegister: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'black',
        margin: 10,
        height: 50,
        color: 'white',
        borderBlockColor: '#0096FF',
        borderWidth: 3
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

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
        color: '#fff',
    },
    statLabel: {
        fontSize: 16,
        color: '#fff',
    },
    postsContainer: {
        flex: 1,
        padding: 20,
    },
});

export default ProfileScreen;