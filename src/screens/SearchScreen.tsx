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
            {item.picture && <Image source={{ uri: item.picture }} style={styles.image} />}
            <Card.Content>
              <Text style={styles.fullName}>{item.fullName}</Text>
              <Text>{item.email}</Text>
            </Card.Content>
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
    color: "black",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  card: {
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default UserSearchScreen;
