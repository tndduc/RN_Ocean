import { Button, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import Register from './Register';
import { useAuth } from '../authentication/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser]: any = useAuth()
    const handleLogin = () => {
        console.log("Begin login")

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
        }).finally(() => {
        });
    };

    return (
        <View style={{ padding: 16 }}>
            <View >
                <Text>Login</Text>
                <Text >Login to Ocean</Text>
            </View>
            <View >
                <TextInput
                    value={email}
                    onChangeText={setEmail}>
                </TextInput>
                <TextInput
                    value={password}
                    onChangeText={setPassword}>
                </TextInput>
            </View>
            <View >

                <Button title='Login' onPress={handleLogin} />
            </View>
        </View >
    )
}
export default Login