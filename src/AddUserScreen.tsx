import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddUserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAddUser = async () => {
    if (!name || !email) {
      setMessage('Name and email are required!');
      return;
    }

    try {
      await firestore().collection('users').add({
        name,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(), // or new Date()
      });
      setMessage('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Add User" onPress={handleAddUser} />
      {!!message && <Text>{message}</Text>}
    </View>
  );
};

export default AddUserScreen;
