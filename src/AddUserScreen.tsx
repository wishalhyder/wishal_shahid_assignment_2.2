import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddUser = async () => {
    // Only validate required fields
    if (!name.trim() || !email.trim()) {
      setError('Name and Email are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userData: Record<string, string | object> = {
        name: name.trim(),
        email: email.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      // Add optional fields only if filled
      if (company.trim()) userData.company = company.trim();
      if (phone.trim()) userData.phone = phone.trim();

      await firestore().collection('users').add(userData);

      // Reset fields
      setName('');
      setEmail('');
      setCompany('');
      setPhone('');
      alert('User added!');
    } catch (e) {
      console.error(e);
      setError('Failed to add user');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Company (optional)"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Phone Number (optional)"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
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
