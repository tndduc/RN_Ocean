import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface User {
  createdAt: string;
  id: number;
  fullName: string;
  picture: string | null;
  phoneNumber: string;
  email: string;
  address: string;
}

const UserSearchScreen = () => {
  const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  const [allUsers, setAllUsers] = useState<User[]>([]); // Original list of users
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // List of users displayed after filtering
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the API
    fetch('https://ocean-apis.onrender.com/api/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAllUsers(data.items);
        setFilteredUsers(data.items);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    // Filter users based on search query from the original list
    const filteredUsers = allUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("user  :" + allUsers.length);
    console.log("search : " + searchQuery)
    console.log("filter :" + filteredUsers.length);
    setFilteredUsers(filteredUsers);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name or email"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              {item.picture ? (
                <Image source={{ uri: item.picture }} style={styles.image} />
              ) : (
                <Image source={{ uri: avatarDefault }} style={styles.image} />
              )}
              <Card.Content>
                <Text style={styles.fullName}>{item.fullName}</Text>
                <Text>{item.email}</Text>
              </Card.Content>
            </View>
          </Card>

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    marginBottom: 8, // Adjust the margin as needed
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginLeft: 8
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default UserSearchScreen;
