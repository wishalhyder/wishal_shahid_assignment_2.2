import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type User = {
  id: string;
  name: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp; // optional timestamp
};

export default function AllUsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const usersList: User[] = [];
          querySnapshot.forEach(doc => {
            usersList.push({
              id: doc.id,
              ...(doc.data() as Omit<User, 'id'>),
            });
          });
          setUsers(usersList);
          setLoading(false);
        },
        err => {
          console.error(err);
          setError('Failed to load users');
          setLoading(false);
        }
      );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#B10808" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No users found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.userCard}>
          <Text style={styles.userName}>{item.name}</Text>
          {item.createdAt && (
            <Text style={styles.timestamp}>
              {item.createdAt.toDate().toLocaleString()}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  userCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#B10808',
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  userName: { fontSize: 18, fontWeight: '600', color: '#B10808' },
  timestamp: { marginTop: 4, fontSize: 12, color: '#888' },
  error: { color: 'red' },
});
