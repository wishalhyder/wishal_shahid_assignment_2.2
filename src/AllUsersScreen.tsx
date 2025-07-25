import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type User = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

export default function AllUsersScreen({ navigation }: any) {
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
            const data = doc.data();
            usersList.push({
              id: doc.id,
              name: data.name,
              email: data.email,
              company: data.company,
              phone: data.phone,
              createdAt: data.createdAt,
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
    <View>
    <FlatList
          data={users}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.field}>📧 {item.email}</Text>
              {item.company ? <Text style={styles.field}>🏢 {item.company}</Text> : null}
              {item.phone ? <Text style={styles.field}>📞 {item.phone}</Text> : null}
              {item.createdAt && (
                <Text style={styles.timestamp}>
                  🕒 {item.createdAt.toDate().toLocaleString()}
                </Text>
              )}
            </View>
          )}
        />
        <View style={styles.addContainer}>
          <TouchableOpacity onPress={()=>{navigation.navigate('AddUser')}} style={styles.loginBtn}>
            <Text>Add User</Text>
          </TouchableOpacity>
        </View>
    </View>
    
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
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B10808',
    marginBottom: 4,
  },
  field: {
    fontSize: 14,
    marginBottom: 2,
    color: '#333',
  },
  addContainer:{
    // backgroundColor: '#000',
    // justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16
  },
  loginBtn:{
    width:'50%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#B10808',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    color: '#ffffff'
  },
  timestamp: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
  },
  error: { color: 'red' },
});
