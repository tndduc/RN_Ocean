import { Alert, Button, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();

const Register = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser]: any = useAuth();

  const handleRegister = () => {
    axios({
      method: 'POST',
      url: 'https://ocean-apis.onrender.com/api/auth/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        fullName: name,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        password: password,
      },
    })
      .then((res) => {
        setUser({ ...res.data });
        console.log(res.data, user);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => {});
  };

  return (
    <View style={{ padding: 16 }}>
      <View>
        <Text>Register</Text>
        <Text>Create an account</Text>
      </View>
      <View>
        <TextInput value={name} onChangeText={setName} />
        <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput value={email} onChangeText={setEmail} />
        <TextInput value={address} onChangeText={setAddress} />
        <TextInput value={password} onChangeText={setPassword} />
      </View>
      <View>
        <Button title="Login Instead" />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
};
export default Register;
