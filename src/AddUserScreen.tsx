import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddUser = async () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await firestore()
        .collection('users')
        .add({ name: name.trim(), createdAt: firestore.FieldValue.serverTimestamp() });
      setName('');
      alert('User added!');
    } catch (e) {
      setError('Failed to add user');
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter user name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={handleAddUser} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add User'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#B10808',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#B10808',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  error: { color: 'red', marginBottom: 8 },
});
